<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$dbHost = '127.0.0.1';
$dbName = 'devnet_db';
$dbUser = 'root';$dbPass = '';

try {
    $pdo = new PDO(
        "mysql:host={$dbHost};dbname={$dbName};charset=utf8mb4",
        $dbUser,$dbPass,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro na conexão com o banco de dados', 'details' => $e->getMessage()]);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true) ?? [];$action = $_GET['action'] ?? ($input['action'] ?? '');

switch ($action) {
    case 'send_code':
        $contactType = ($input['contactType'] ?? 'gmail') === 'phone' ? 'phone' : 'gmail';
        $contactValue = trim($input['contactValue'] ?? '');

        if ($contactValue === '') {
            http_response_code(400);
            echo json_encode(['error' => 'Informe um Gmail ou número de telefone válido.']);
            exit;
        }

        $code = str_pad((string) random_int(0, 999999), 6, '0', STR_PAD_LEFT);$expiresAt = date('Y-m-d H:i:s', strtotime('+10 minutes'));

        $stmt = $pdo->prepare( 'INSERT INTO verification_codes (contact_value, code, expires_at) VALUES (:contact, :code, :expires)' );$stmt->execute([
            ':contact' => $contactValue,
            ':code' => $code,
            ':expires' => $expiresAt,
        ]);

        if ($contactType === 'gmail') {
            $subject = 'Seu codigo de confirmacao DevNet';$message = "Seu codigo de verificacao DevNet e: {$code} (valido por 10 minutos).";
            @mail($contactValue, $subject,$message, "From: noreply@devnet.local\r\nContent-Type: text/plain; charset=UTF-8");
        }

        echo json_encode([
            'ok' => true,
            'message' => "Código enviado para {$contactValue}",
            'debug_code' => $code,
        ]);
        break;

    case 'verify_and_register':
        $name = trim($input['name'] ?? '');
        $username = strtolower(preg_replace('/[^a-z0-9._]/', '',$input['username'] ?? ''));
        $contactType = ($input['contactType'] ?? 'gmail') === 'phone' ? 'phone' : 'gmail';
        $contactValue = trim($input['contactValue'] ?? '');
        $accountType = ($input['accountType'] ?? 'personal') === 'commercial' ? 'commercial' : 'personal';
        $niche = trim($input['niche'] ?? 'Dev Fullstack');
        $college = trim($input['college'] ?? '');
        $code = trim($input['code'] ?? '');

        if ($name === '' \vert{}\vert{}$username === '' || $contactValue === '' \vert{}\vert{}$code === '') {
            http_response_code(400);
            echo json_encode(['error' => 'Preencha todos os campos obrigatórios e o código.']);
            exit;
        }

        $checkCode = $pdo->prepare( 'SELECT id FROM verification_codes WHERE contact_value = :contact AND code = :code AND used = 0 AND expires_at >= NOW() ORDER BY id DESC LIMIT 1' );$checkCode->execute([
            ':contact' => $contactValue,
            ':code' => $code,
        ]);
        $otpRow =$checkCode->fetch();

        if (!$otpRow) {
            http_response_code(401);
            echo json_encode(['error' => 'Código inválido ou expirado.']);
            exit;
        }

        $pdo->prepare('UPDATE verification_codes SET used = 1 WHERE id = :id')->execute([':id' =>$otpRow['id']]);

        $insertUser = $pdo->prepare( 'INSERT INTO users (name, username, contact_type, contact_value, account_type, niche, college) VALUES (:name, :username, :ctype, :cval, :atype, :niche, :college)' );$insertUser->execute([
            ':name' => $name,
            ':username' => $username,
            ':ctype' => $contactType,
            ':cval' => $contactValue,
            ':atype' => $accountType,
            ':niche' => $niche,
            ':college' => $college,
        ]);

        echo json_encode([
            'ok' => true,
            'userId' => (int) $pdo->lastInsertId(),
            'accountType' => $accountType,
            'message' => 'Conta criada e verificada com sucesso!',
        ]);
        break;

    case 'subscribe_courses':
        $userId = (int) ($input['userId'] ?? 0);$monthlyFee = 59.99;

        if ($userId <= 0) {
            http_response_code(400);
            echo json_encode(['error' => 'Usuário inválido.']);
            exit;
        }

        $pdo->beginTransaction();$pdo->prepare(
            'INSERT INTO payments (user_id, payment_type, amount, status)
             VALUES (:uid, "course_subscription", :amount, "paid")'
        )->execute([
            ':uid' => $userId,
            ':amount' => $monthlyFee,
        ]);
        $pdo->prepare('UPDATE users SET is_course_creator = 1 WHERE id = :uid')->execute([':uid' => $userId]);$pdo->commit();

        echo json_encode([
            'ok' => true,
            'amountCredited' => $monthlyFee,
            'message' => 'Assinatura de R$ 59,99/mês confirmada e cursos protegidos liberados.',
        ]);
        break;

    case 'buy_ad_hours':
        $userId = (int) ($input['userId'] ?? 0);$hours = max(1, (int) ($input['hours'] ?? 1));$hourlyRate = 15.00;
        $total = round($hours * $hourlyRate, 2);

        if ($userId <= 0) {
            http_response_code(400);
            echo json_encode(['error' => 'Usuário inválido.']);
            exit;
        }

        $pdo->prepare(
            'INSERT INTO payments (user_id, payment_type, hours_bought, amount, status)
             VALUES (:uid, "hourly_ad", :hours, :amount, "paid")'
        )->execute([
            ':uid' => $userId,
            ':hours' => $hours,
            ':amount' => $total,
        ]);

        echo json_encode([
            'ok' => true,
            'hours' => $hours,
            'amountCredited' => $total,
            'message' => "Anúncio ativo por {$hours}h. R$ " . number_format($total, 2, ',', '.') . " creditado.",
        ]);
        break;

    case 'platform_balance':
        $row =$pdo->query(
            'SELECT
                COALESCE(SUM(amount), 0) AS total_earned,
                COALESCE(SUM(CASE WHEN payment_type = "hourly_ad" THEN amount ELSE 0 END), 0) AS ads_revenue,
                COALESCE(SUM(CASE WHEN payment_type = "course_subscription" THEN amount ELSE 0 END), 0) AS courses_revenue
             FROM payments WHERE status = "paid"'
        )->fetch();

        echo json_encode(['ok' => true, 'balance' => $row]);
        break;

    default:
        http_response_code(404);
        echo json_encode(['error' => 'Ação não encontrada.']);
}
