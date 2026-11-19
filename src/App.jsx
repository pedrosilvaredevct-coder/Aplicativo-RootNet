import React, { useState } from 'react';
import {
  Home, PlaySquare, Send, Search, User, Heart, MessageCircle, Bookmark,
  PlusSquare, BadgeCheck, Radio, Shield, Terminal, Code2, Cpu, Wifi,
  Github, Linkedin, Youtube, Settings, Lock, Eye, Sparkles, CheckCircle2,
  X, ChevronRight, Menu, LogOut, Building2, Play, ArrowLeft, AlertCircle,
  Mail, Phone, KeyRound, RefreshCw
} from 'lucide-react';

const INITIAL_USERS = [
  {
    id: 'u1',
    name: 'Pedro Silva',
    username: 'dev.pedrosilva',
    birthDate: '2004-12-02',
    niche: 'Redes & Telecom',
    college: 'Ciência da Computação',
    accountType: 'creator',
    followers: 7051,
    following: 963,
    bio: 'Site sobre computadores e internet\n💻 Ciência da Computação. 18y ☕\n🌐 Redes & Telecom | Keep connected ⚡📡👨‍💻',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    github: 'github.com/pedrosilva-net',
    linkedin: 'linkedin.com/in/pedrosilva-ti',
    youtube: 'youtube.com/@analisemath',
    note: 'A vibe do dia... 🧠',
    obsession: 'Programação 👨‍💻',
    isCourseCreator: false,
    isVerified: false,
  },
  {
    id: 'u2',
    name: 'Clara SecOps',
    username: 'clara.redteam',
    birthDate: '1999-05-14',
    niche: 'Cibersegurança',
    college: 'USP - Segurança da Informação',
    accountType: 'creator',
    followers: 642300,
    following: 412,
    bio: 'Pentester & Bug Bounty Hunter 🛡️\nQuebrando sistemas para deixá-los seguros.\nOSCP | CEH | Kali Linux',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    github: 'github.com/clararedteam',
    linkedin: 'linkedin.com/in/clarasecops',
    youtube: 'youtube.com/@clararedteam',
    note: 'Analisando CVE nova...',
    obsession: 'Reverse Engineering',
    isCourseCreator: true,
    isVerified: true,
  },
  {
    id: 'u3',
    name: 'CyberCore Cloud',
    username: 'cybercore.oficial',
    birthDate: '2018-03-10',
    niche: 'Cloud & DevOps',
    college: 'Empresa Verificada',
    accountType: 'company',
    followers: 890400,
    following: 85,
    bio: 'Infraestrutura Cloud de alta disponibilidade para devs e empresas 🚀\nKubernetes • AWS • Bare Metal',
    avatar: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=200&q=80',
    github: 'github.com/cybercore-cloud',
    linkedin: 'linkedin.com/company/cybercore',
    youtube: 'youtube.com/@cybercore',
    note: '99.99% Uptime',
    obsession: 'Zero Trust Architecture',
    isCourseCreator: true,
    isVerified: true,
  },
  {
    id: 'u4',
    name: 'Lucas Kernel',
    username: 'lucas.fullstack',
    birthDate: '2001-08-22',
    niche: 'Dev Fullstack',
    college: 'UFAM - Engenharia de Software',
    accountType: 'creator',
    followers: 518900,
    following: 620,
    bio: 'Arquitetura limpa, Rust, TypeScript e café forte ☕\nCriador do curso Arquitetura Escalável.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    github: 'github.com/lucaskernel',
    linkedin: 'linkedin.com/in/lucaskernel',
    youtube: 'youtube.com/@lucaskernel',
    note: 'Refatorando legado',
    obsession: 'Rust & WebAssembly',
    isCourseCreator: true,
    isVerified: true,
  },
  {
    id: 'u5',
    name: 'Mariana DataAI',
    username: 'mari.neural',
    birthDate: '2000-11-03',
    niche: 'IA & Dados',
    college: 'Unicamp - Ciência de Dados',
    accountType: 'creator',
    followers: 124500,
    following: 310,
    bio: 'Machine Learning, LLMs locais e Python 🐍\nDemocratizando inteligência artificial.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    github: 'github.com/marineural',
    linkedin: 'linkedin.com/in/marianadataai',
    youtube: 'youtube.com/@marineural',
    note: 'Treinando modelo...',
    obsession: 'Fine-tuning LLMs',
    isCourseCreator: false,
    isVerified: false,
  }
];

const INITIAL_LIVES = [
  {
    id: 'live1',
    userId: 'u2',
    title: 'Pentest em Rede Wi-Fi Corporativa ao Vivo (Lab)',
    viewers: 1420,
    niche: 'Cibersegurança',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'live2',
    userId: 'u4',
    title: 'Construindo API de Alta Performance em Rust',
    viewers: 875,
    niche: 'Dev Fullstack',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'live3',
    userId: 'u3',
    title: 'Deploy Zero-Downtime com Kubernetes & Docker',
    viewers: 2190,
    niche: 'Cloud & DevOps',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
  }
];

const INITIAL_POSTS = [
  {
    id: 'p1',
    userId: 'u2',
    type: 'video',
    niche: 'Cibersegurança',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    caption: 'Como detectar varredura de portas Nmap na sua rede em menos de 10 segundos usando regras simples de firewall 🛡️🐧 #cybersec #linux #infosec',
    codeSnippet: 'sudo iptables -A INPUT -p tcp --tcp-flags ALL NONE -j DROP\nsudo tail -f /var/log/syslog | grep "SYN_SCAN"',
    likes: 18420,
    views: '372 mil',
    duration: '03:01',
    timestamp: 'há 46 minutos',
    isSponsored: false,
    comments: [
      { user: 'dev.pedrosilva', text: 'Salvei esse comando pro meu lab de redes!' },
      { user: 'lucas.fullstack', text: 'Essencial pra qualquer servidor exposto.' }
    ]
  },
  {
    id: 'p2',
    userId: 'u3',
    type: 'ad',
    niche: 'Cloud & DevOps',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    caption: 'Servidores VPS NVMe com proteção Anti-DDoS nativa e latência < 12ms no Brasil. Teste grátis por 7 dias com o cupom DEVNET26 🚀',
    likes: 4310,
    views: '1,1 mi',
    duration: 'Patrocinado',
    timestamp: 'Anúncio Ativo',
    isSponsored: true,
    adHours: 12,
    comments: []
  },
  {
    id: 'p3',
    userId: 'u4',
    type: 'image',
    niche: 'Dev Fullstack',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    caption: 'Setup atualizado para codar de madrugada. Menos abas abertas, mais foco na arquitetura 💻☕ #setup #programming #cleanarchitecture',
    likes: 12900,
    views: '49,2 mil',
    duration: '',
    timestamp: 'há 2 horas',
    isSponsored: false,
    comments: [
      { user: 'mari.neural', text: 'Monitor vertical faz toda diferença pra ler logs!' }
    ]
  },
  {
    id: 'p4',
    userId: 'u5',
    type: 'video',
    niche: 'IA & Dados',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
    caption: 'Rodando modelos LLM localmente na GPU sem depender de API externa. Privacidade total dos seus dados! 🤖⚡ #ai #python #llm',
    likes: 9850,
    views: '37,5 mil',
    duration: '04:41',
    timestamp: 'há 5 horas',
    isSponsored: false,
    comments: []
  }
];

const INITIAL_COURSES = [
  {
    id: 'c1',
    authorId: 'u2',
    title: 'Formação Red Team & Pentest Web Avançado',
    niche: 'Cibersegurança',
    modules: 28,
    hours: '42h',
    price: 'R$ 197,00',
    students: 3420,
    protectedDRM: true,
    thumbnail: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&w=800&q=80',
    description: 'Do reconhecimento passivo à exploração avançada de falhas OWASP Top 10 com laboratório prático.'
  },
  {
    id: 'c2',
    authorId: 'u4',
    title: 'Fullstack & Microsserviços de Alta Escala',
    niche: 'Dev Fullstack',
    modules: 35,
    hours: '56h',
    price: 'R$ 249,90',
    students: 5180,
    protectedDRM: true,
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    description: 'Node.js, Rust, Docker, mensageria com Kafka e bancos distribuídos na prática.'
  },
  {
    id: 'c3',
    authorId: 'u3',
    title: 'Administração Linux, VLANs e Redes Corporativas',
    niche: 'Redes & Telecom',
    modules: 22,
    hours: '30h',
    price: 'R$ 149,00',
    students: 2890,
    protectedDRM: true,
    thumbnail: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    description: 'Roteamento BGP, OSPF, configuração de OLTs, VLAN Trunk/Access e monitoramento Zabbix.'
  }
];

const NICHES = [
  'Todos',
  'Cibersegurança',
  'Redes & Telecom',
  'Dev Fullstack',
  'Cloud & DevOps',
  'IA & Dados'
];

const AD_HOURLY_RATE = 15.0;
const COURSE_MONTHLY_FEE = 59.99;

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [users, setUsers] = useState(INITIAL_USERS);
  const [currentUserId, setCurrentUserId] = useState('u1');

  const [regForm, setRegForm] = useState({
    name: '',
    username: '',
    contactType: 'gmail',
    contactValue: '',
    accountType: 'personal',
    birthDate: '2003-06-15',
    niche: 'Cibersegurança',
    college: '',
    github: '',
    linkedin: '',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
  });
  const [regStep, setRegStep] = useState(1);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpBannerVisible, setOtpBannerVisible] = useState(false);
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState('home');
  const [viewedProfileId, setViewedProfileId] = useState(null);

  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [lives, setLives] = useState(INITIAL_LIVES);
  const [likedPosts, setLikedPosts] = useState({});
  const [savedPosts, setSavedPosts] = useState({});
  const [followingIds, setFollowingIds] = useState(['u2', 'u3', 'u4']);
  const [commentInputs, setCommentInputs] = useState({});

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('Todos');

  const [selectedChatUserId, setSelectedChatUserId] = useState('u2');
  const [chatHistory, setChatHistory] = useState({
    u2: [
      { sender: 'them', text: 'E aí! Vi que você curte Redes e Cibersegurança. Já testou o novo lab de VLANs?', time: '22:10' },
      { sender: 'me', text: 'Fala Clara! Tô montando o ambiente aqui agora mesmo com Linux e Zabbix.', time: '22:12' }
    ],
    u4: [
      { sender: 'them', text: 'Se precisar de dicas pra subir tua API em produção, me chama aqui!', time: '19:45' }
    ],
    u3: [
      { sender: 'them', text: 'Bem-vindo à DevNet! Confira nossas instâncias Cloud com proteção DDoS.', time: '14:20' }
    ]
  });
  const [chatInput, setChatInput] = useState('');

  const [activeLiveModal, setActiveLiveModal] = useState(null);
  const [liveChatMessages, setLiveChatMessages] = useState([
    { user: 'root_hunter', text: 'Qual distro tá rodando aí?' },
    { user: 'net_ninja', text: 'Aula demais! 🔥' }
  ]);
  const [liveChatInput, setLiveChatInput] = useState('');

  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);
  const [settingsSubTab, setSettingsSubTab] = useState('ads');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createType, setCreateType] = useState('post');

  const [platformRevenue, setPlatformRevenue] = useState({
    totalEarned: 1489.70,
    adsRevenue: 890.00,
    coursesSubRevenue: 599.70,
    transactions: [
      { id: 't1', desc: 'Anúncio Patrocinado (12h) - @cybercore.oficial', amount: 180.00, date: 'Hoje, 21:30' },
      { id: 't2', desc: 'Assinatura Mensal Criador de Cursos - @clara.redteam', amount: 59.99, date: 'Hoje, 18:15' },
      { id: 't3', desc: 'Assinatura Mensal Criador de Cursos - @lucas.fullstack', amount: 59.99, date: 'Ontem' },
    ]
  });

  const [adTitle, setAdTitle] = useState('');
  const [adNiche, setAdNiche] = useState('Cibersegurança');
  const [adHours, setAdHours] = useState(6);
  const [adImage] = useState('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80');

  const [newContentTitle, setNewContentTitle] = useState('');
  const [newContentDesc, setNewContentDesc] = useState('');
  const [newContentCode, setNewContentCode] = useState('');
  const [newContentPrice, setNewContentPrice] = useState('R$ 97,00');
  const [newContentNiche, setNewContentNiche] = useState('Cibersegurança');

  const [toast, setToast] = useState(null);
  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const currentUser = users.find((u) => u.id === currentUserId) || users[0];

  const handleSendVerificationCode = (e) => {
    e.preventDefault();
    setAuthError('');
    if (!regForm.name.trim() || !regForm.username.trim() || !regForm.contactValue.trim()) {
      setAuthError('Preencha seu nome, nome de usuário e seu Gmail ou Telefone.');
      return;
    }
    const cleanUser = regForm.username.toLowerCase().replace(/[^a-z0-9._]/g, '');
    if (users.some((u) => u.username === cleanUser)) {
      setAuthError('Este nome de usuário já está em uso na comunidade.');
      return;
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setEnteredOtp('');
    setRegStep(2);
    setOtpBannerVisible(true);
    triggerToast(
      regForm.contactType === 'gmail'
        ? `Código enviado para ${regForm.contactValue}`
        : `SMS enviado para ${regForm.contactValue}`
    );
  };

  const handleResendCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setOtpBannerVisible(true);
    triggerToast('Novo código de verificação gerado!');
  };

  const handleConfirmRegister = (e) => {
    e.preventDefault();
    setAuthError('');
    if (enteredOtp.trim() !== generatedOtp) {
      setAuthError('Código inválido. Verifique os 6 dígitos enviados.');
      return;
    }

    const cleanUser = regForm.username.toLowerCase().replace(/[^a-z0-9._]/g, '');
    const isCommercial = regForm.accountType === 'commercial';
    const newUser = {
      id: 'u_' + Date.now(),
      name: regForm.name,
      username: cleanUser,
      email: regForm.contactType === 'gmail' ? regForm.contactValue : '',
      phone: regForm.contactType === 'phone' ? regForm.contactValue : '',
      birthDate: regForm.birthDate || '2003-01-01',
      niche: regForm.niche || 'Dev Fullstack',
      college: regForm.college || (isCommercial ? 'Empresa / Criador T.I.' : 'Comunidade DevNet'),
      accountType: isCommercial ? 'company' : 'personal',
      followers: 1,
      following: 3,
      bio: `${isCommercial ? 'Conta Comercial / Criador Tech' : 'Membro DevNet'} | ${regForm.niche} 💻`,
      avatar: regForm.avatar,
      github: regForm.github || `github.com/${cleanUser}`,
      linkedin: regForm.linkedin || `linkedin.com/in/${cleanUser}`,
      youtube: '',
      note: 'Online na DevNet 🚀',
      obsession: regForm.niche,
      isCourseCreator: false,
      isVerified: false,
    };

    setUsers([newUser, ...users]);
    setCurrentUserId(newUser.id);
    setIsAuthenticated(true);
    setOtpBannerVisible(false);
    setRegStep(1);
    triggerToast(`Conta ${isCommercial ? 'Comercial' : 'Pessoal'} verificada! Bem-vindo, @${newUser.username}`);
  };

  const handleDemoLogin = (userId = 'u1') => {
    setCurrentUserId(userId);
    setIsAuthenticated(true);
    triggerToast('Conectado à rede DevNet!');
  };

  const toggleLike = (postId) => {
    setLikedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }));
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, likes: likedPosts[postId] ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  };

  const toggleFollow = (targetId) => {
    if (targetId === currentUser.id) return;
    const isFollowing = followingIds.includes(targetId);
    setFollowingIds((prev) =>
      isFollowing ? prev.filter((id) => id !== targetId) : [...prev, targetId]
    );
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === targetId) {
          const updatedFollowers = isFollowing ? u.followers - 1 : u.followers + 1;
          return {
            ...u,
            followers: updatedFollowers,
            isVerified: updatedFollowers >= 500000 ? true : u.isVerified,
          };
        }
        if (u.id === currentUser.id) {
          return { ...u, following: isFollowing ? u.following - 1 : u.following + 1 };
        }
        return u;
      })
    );
  };

  const handleAddComment = (postId) => {
    const text = (commentInputs[postId] || '').trim();
    if (!text) return;
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, comments: [...p.comments, { user: currentUser.username, text }] }
          : p
      )
    );
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
  };

  const handleBoostFollowers = () => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === currentUser.id) {
          const nextFollowers = u.followers + 250000;
          const unlocked = nextFollowers >= 500000;
          if (unlocked && !u.isVerified) {
            triggerToast('🎉 Parabéns! Você atingiu +500k seguidores e desbloqueou o Selo Verificado!');
          } else {
            triggerToast(`+250.000 seguidores! Total: ${nextFollowers.toLocaleString('pt-BR')}`);
          }
          return {
            ...u,
            followers: nextFollowers,
            isVerified: unlocked,
          };
        }
        return u;
      })
    );
  };

  const handlePublishAd = (e) => {
    e.preventDefault();
    if (!adTitle.trim()) return;
    const totalCost = adHours * AD_HOURLY_RATE;

    const newAd = {
      id: 'ad_' + Date.now(),
      userId: currentUser.id,
      type: 'ad',
      niche: adNiche,
      image: adImage,
      caption: adTitle,
      likes: 1,
      views: 'Impulsionando',
      duration: `Patrocinado • ${adHours}h`,
      timestamp: 'Agora',
      isSponsored: true,
      adHours: adHours,
      comments: []
    };

    setPosts([newAd, ...posts]);
    setPlatformRevenue((prev) => ({
      totalEarned: +(prev.totalEarned + totalCost).toFixed(2),
      adsRevenue: +(prev.adsRevenue + totalCost).toFixed(2),
      coursesSubRevenue: prev.coursesSubRevenue,
      transactions: [
        {
          id: 'tx_' + Date.now(),
          desc: `Anúncio (${adHours}h × R$${AD_HOURLY_RATE}) - @${currentUser.username}`,
          amount: totalCost,
          date: 'Agora mesmo'
        },
        ...prev.transactions
      ]
    }));

    setAdTitle('');
    setShowSettingsDrawer(false);
    setActiveTab('home');
    triggerToast(`Anúncio ativo por ${adHours}h! R$ ${totalCost.toFixed(2)} creditado na sua conta.`);
  };

  const handleSubscribeCourseCreator = () => {
    if (currentUser.isCourseCreator) return;
    setUsers((prev) =>
      prev.map((u) => (u.id === currentUser.id ? { ...u, isCourseCreator: true } : u))
    );
    setPlatformRevenue((prev) => ({
      totalEarned: +(prev.totalEarned + COURSE_MONTHLY_FEE).toFixed(2),
      adsRevenue: prev.adsRevenue,
      coursesSubRevenue: +(prev.coursesSubRevenue + COURSE_MONTHLY_FEE).toFixed(2),
      transactions: [
        {
          id: 'tx_' + Date.now(),
          desc: `Assinatura Criador de Cursos (Mensal) - @${currentUser.username}`,
          amount: COURSE_MONTHLY_FEE,
          date: 'Agora mesmo'
        },
        ...prev.transactions
      ]
    }));
    triggerToast('Plano Criador Ativo (R$ 59,99/mês)! Proteção DRM liberada para seus cursos.');
  };

  const handleCreateContent = (e) => {
    e.preventDefault();
    if (!newContentTitle.trim()) return;

    if (createType === 'course') {
      if (!currentUser.isCourseCreator) {
        setShowCreateModal(false);
        setShowSettingsDrawer(true);
        setSettingsSubTab('courses');
        triggerToast('Assine o Plano Criador (R$ 59,99/mês) para publicar cursos protegidos!');
        return;
      }
      const newCourse = {
        id: 'c_' + Date.now(),
        authorId: currentUser.id,
        title: newContentTitle,
        niche: newContentNiche,
        modules: 12,
        hours: '18h',
        price: newContentPrice || 'R$ 97,00',
        students: 1,
        protectedDRM: true,
        thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=800&q=80',
        description: newContentDesc || 'Curso técnico exclusivo com proteção anti-pirataria DevNet DRM.'
      };
      setCourses([newCourse, ...courses]);
      setActiveTab('reels');
      triggerToast('Curso publicado com proteção DRM ativa!');
    } else if (createType === 'live') {
      const newLive = {
        id: 'live_' + Date.now(),
        userId: currentUser.id,
        title: newContentTitle,
        viewers: 142,
        niche: newContentNiche,
        thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
      };
      setLives([newLive, ...lives]);
      setActiveLiveModal(newLive);
      triggerToast('Você está AO VIVO para a comunidade de T.I.!');
    } else {
      const newPost = {
        id: 'p_' + Date.now(),
        userId: currentUser.id,
        type: createType,
        niche: newContentNiche,
        image:
          createType === 'video'
            ? 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80'
            : 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
        caption: `${newContentTitle}${newContentDesc ? ' — ' + newContentDesc : ''}`,
        codeSnippet: newContentCode.trim() || null,
        likes: 1,
        views: '1,2 mil',
        duration: createType === 'video' ? '02:15' : '',
        timestamp: 'Agora mesmo',
        isSponsored: false,
        comments: []
      };
      setPosts([newPost, ...posts]);
      setActiveTab('home');
      triggerToast(createType === 'video' ? 'Vídeo publicado no feed!' : 'Post publicado!');
    }

    setNewContentTitle('');
    setNewContentDesc('');
    setNewContentCode('');
    setShowCreateModal(false);
  };

  const handleSendDirectMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const msgText = chatInput.trim();
    setChatHistory((prev) => ({
      ...prev,
      [selectedChatUserId]: [
        ...(prev[selectedChatUserId] || []),
        { sender: 'me', text: msgText, time: 'Agora' }
      ]
    }));
    setChatInput('');

    setTimeout(() => {
      const targetUser = users.find((u) => u.id === selectedChatUserId);
      const replies = [
        `Boa! Aqui na área de ${targetUser?.niche || 'T.I.'} a gente usa bastante isso em produção.`,
        'Manda o repositório do GitHub depois pra eu dar uma olhada!',
        'Show! Se quiser abrir uma live em conjunto sobre esse tema, bora marcar.'
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      setChatHistory((prev) => ({
        ...prev,
        [selectedChatUserId]: [
          ...(prev[selectedChatUserId] || []),
          { sender: 'them', text: randomReply, time: 'Agora' }
        ]
      }));
    }, 900);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col justify-between p-5 max-w-md mx-auto border-x border-zinc-900 relative">
        {otpBannerVisible && generatedOtp && (
          <div className="fixed top-3 left-1/2 -translate-x-1/2 w-[92%] max-w-sm bg-zinc-900 border border-sky-500/70 rounded-2xl p-3.5 shadow-2xl z-50">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                  {regForm.contactType === 'gmail' ? <Mail className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                </div>
                <div>
                  <p className="text-[11px] text-zinc-400 font-medium">
                    {regForm.contactType === 'gmail' ? 'Novo e-mail no Gmail' : 'Nova mensagem SMS'}
                  </p>
                  <p className="text-xs text-white mt-0.5">
                    Seu código DevNet é: <span className="font-mono font-bold text-sky-400 text-sm tracking-widest">{generatedOtp}</span>
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOtpBannerVisible(false)}
                className="text-zinc-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => setEnteredOtp(generatedOtp)}
              className="mt-2.5 w-full bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 text-xs font-semibold py-1.5 rounded-lg transition"
            >
              Preencher código automaticamente
            </button>
          </div>
        )}

        <div className="mt-6">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
              <Terminal className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">DevNet</h1>
              <p className="text-xs text-zinc-400">Comunidade exclusiva para T.I., Devs & Cyber</p>
            </div>
          </div>

          <div className="grid grid-cols-2 bg-zinc-900 p-1 rounded-xl mt-6 border border-zinc-800">
            <button
              onClick={() => {
                setAuthMode('login');
                setRegStep(1);
                setAuthError('');
              }}
              className={`py-2 text-sm font-semibold rounded-lg transition ${
                authMode === 'login' ? 'bg-zinc-800 text-white' : 'text-zinc-400'
              }`}
            >
              Entrar
            </button>
            <button
              onClick={() => {
                setAuthMode('register');
                setRegStep(1);
                setAuthError('');
              }}
              className={`py-2 text-sm font-semibold rounded-lg transition ${
                authMode === 'register' ? 'bg-zinc-800 text-white' : 'text-zinc-400'
              }`}
            >
              Criar Conta T.I.
            </button>
          </div>

          {authMode === 'login' ? (
            <div className="mt-6 space-y-4">
              <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-4 space-y-3">
                <p className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">
                  Acesso Rápido (Perfis Demo)
                </p>
                {users.slice(0, 3).map((u) => (
                  <button
                    key={u.id}
                    onClick={() => handleDemoLogin(u.id)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800/80 border border-zinc-800/80 transition text-left"
                  >
                    <div className="flex items-center gap-3">
                      <img src={u.avatar} alt={u.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-semibold">{u.username}</span>
                          {u.isVerified && <BadgeCheck className="w-4 h-4 text-sky-400 fill-sky-400/20" />}
                        </div>
                        <span className="text-xs text-zinc-400">{u.niche} • {u.college}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-500" />
                  </button>
                ))}
              </div>

              <div className="space-y-3 pt-2">
                <input
                  type="text"
                  placeholder="Nome de usuário (@dev...)"
                  defaultValue="dev.pedrosilva"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-500"
                />
                <input
                  type="password"
                  placeholder="Senha ou Chave SSH"
                  defaultValue="••••••••••••"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-500"
                />
                <button
                  onClick={() => handleDemoLogin('u1')}
                  className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 rounded-xl transition shadow-lg shadow-sky-500/20"
                >
                  Entrar na Comunidade
                </button>
              </div>
            </div>
          ) : regStep === 1 ? (
            <form onSubmit={handleSendVerificationCode} className="mt-5 space-y-3.5 pb-6">
              {authError && (
                <div className="bg-red-500/10 border border-red-500/40 text-red-400 text-xs p-3 rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <div>
                <label className="text-xs text-zinc-400 block mb-1">Nome Completo *</label>
                <input
                  required
                  type="text"
                  placeholder="Ex: Pedro Silva"
                  value={regForm.name}
                  onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1">Nome de Usuário *</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-zinc-500 text-sm">@</span>
                  <input
                    required
                    type="text"
                    placeholder="dev.pedrosilva"
                    value={regForm.username}
                    onChange={(e) => setRegForm({ ...regForm, username: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-8 pr-3.5 py-2.5 text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1.5">Tipo de Conta *</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRegForm({ ...regForm, accountType: 'personal' })}
                    className={`p-3 rounded-xl border text-left transition flex items-center gap-2.5 ${
                      regForm.accountType === 'personal'
                        ? 'bg-sky-500/15 border-sky-500 text-white'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    <User className={`w-4 h-4 shrink-0 ${regForm.accountType === 'personal' ? 'text-sky-400' : 'text-zinc-500'}`} />
                    <div>
                      <p className="text-xs font-bold">Pessoal</p>
                      <p className="text-[10px] text-zinc-400">Dev, estudante, cyber</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRegForm({ ...regForm, accountType: 'commercial' })}
                    className={`p-3 rounded-xl border text-left transition flex items-center gap-2.5 ${
                      regForm.accountType === 'commercial'
                        ? 'bg-sky-500/15 border-sky-500 text-white'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    <Building2 className={`w-4 h-4 shrink-0 ${regForm.accountType === 'commercial' ? 'text-sky-400' : 'text-zinc-500'}`} />
                    <div>
                      <p className="text-xs font-bold">Comercial</p>
                      <p className="text-[10px] text-zinc-400">Empresa ou Criador</p>
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs text-zinc-400">Receber código de confirmação via *</label>
                  <div className="flex bg-zinc-900 rounded-lg p-0.5 border border-zinc-800">
                    <button
                      type="button"
                      onClick={() => setRegForm({ ...regForm, contactType: 'gmail', contactValue: '' })}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1 transition ${
                        regForm.contactType === 'gmail' ? 'bg-sky-500 text-white' : 'text-zinc-400'
                      }`}
                    >
                      <Mail className="w-3 h-3" /> Gmail
                    </button>
                    <button
                      type="button"
                      onClick={() => setRegForm({ ...regForm, contactType: 'phone', contactValue: '' })}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1 transition ${
                        regForm.contactType === 'phone' ? 'bg-sky-500 text-white' : 'text-zinc-400'
                      }`}
                    >
                      <Phone className="w-3 h-3" /> Telefone
                    </button>
                  </div>
                </div>

                {regForm.contactType === 'gmail' ? (
                  <div className="relative">
                    <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
                    <input
                      required
                      type="email"
                      placeholder="seuemail@gmail.com"
                      value={regForm.contactValue}
                      onChange={(e) => setRegForm({ ...regForm, contactValue: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-3.5 py-2.5 text-sm focus:outline-none focus:border-sky-500"
                    />
                  </div>
                ) : (
                  <div className="relative">
                    <Phone className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
                    <input
                      required
                      type="tel"
                      placeholder="+55 (96) 99999-9999"
                      value={regForm.contactValue}
                      onChange={(e) => setRegForm({ ...regForm, contactValue: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-3.5 py-2.5 text-sm focus:outline-none focus:border-sky-500"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Área / Nicho</label>
                  <select
                    value={regForm.niche}
                    onChange={(e) => setRegForm({ ...regForm, niche: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-sky-500"
                  >
                    {NICHES.filter((n) => n !== 'Todos').map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Faculdade / Empresa</label>
                  <input
                    type="text"
                    placeholder="Ex: Eng. Software"
                    value={regForm.college}
                    onChange={(e) => setRegForm({ ...regForm, college: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 rounded-xl transition shadow-lg shadow-sky-500/20 mt-2 flex items-center justify-center gap-2"
              >
                <span>Enviar Código de Confirmação</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleConfirmRegister} className="mt-6 space-y-4">
              <button
                type="button"
                onClick={() => {
                  setRegStep(1);
                  setAuthError('');
                }}
                className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4" /> Alterar dados ou contato
              </button>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-sky-400">
                  <KeyRound className="w-5 h-5" />
                  <h3 className="text-sm font-bold text-white">Confirme seu {regForm.contactType === 'gmail' ? 'Gmail' : 'Telefone'}</h3>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Enviamos um código de 6 dígitos para <span className="text-white font-semibold">{regForm.contactValue}</span>. Digite abaixo para ativar sua conta <span className="text-sky-400 font-semibold">{regForm.accountType === 'commercial' ? 'Comercial' : 'Pessoal'}</span>.
                </p>
              </div>

              {authError && (
                <div className="bg-red-500/10 border border-red-500/40 text-red-400 text-xs p-3 rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <div>
                <label className="text-xs text-zinc-400 block mb-1.5">Código de Verificação (6 dígitos)</label>
                <input
                  required
                  type="text"
                  maxLength={6}
                  placeholder="000000"
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3.5 text-center font-mono text-2xl tracking-[0.5em] font-bold text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-3 rounded-xl transition shadow-lg shadow-emerald-500/20"
              >
                Confirmar Código e Entrar
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResendCode}
                  className="text-xs text-zinc-400 hover:text-sky-400 inline-flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Reenviar código de confirmação
                </button>
              </div>
            </form>
          )}
        </div>

        <p className="text-[11px] text-center text-zinc-600 pb-2">
          Acesso restrito a profissionais, empresas e estudantes de Tecnologia da Informação.
        </p>
      </div>
    );
  }

  const renderProfileView = (profileUser) => {
    const isOwnProfile = profileUser.id === currentUser.id;
    const userPosts = posts.filter((p) => p.userId === profileUser.id);
    const isFollowing = followingIds.includes(profileUser.id);
    const followersToVerify = Math.max(0, 500000 - profileUser.followers);

    return (
      <div className="pb-20">
        <div className="sticky top-0 z-20 bg-black/95 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-zinc-900">
          <div className="flex items-center gap-2">
            {!isOwnProfile && (
              <button onClick={() => setViewedProfileId(null)} className="mr-1 text-zinc-300">
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <span className="font-bold text-base tracking-tight">{profileUser.username}</span>
            {profileUser.isVerified && (
              <BadgeCheck className="w-4 h-4 text-sky-400 fill-sky-400/20 devnet-verified-badge" />
            )}
          </div>

          <div className="flex items-center gap-4">
            {isOwnProfile && (
              <>
                <button
                  onClick={() => {
                    setCreateType('post');
                    setShowCreateModal(true);
                  }}
                  title="Criar Publicação"
                >
                  <PlusSquare className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={() => {
                    setSettingsSubTab('ads');
                    setShowSettingsDrawer(true);
                  }}
                  title="Configurações & Monetização"
                >
                  <Menu className="w-6 h-6 text-white" />
                </button>
              </>
            )}
          </div>
        </div>

        <div className="px-4 pt-5">
          <div className="flex items-center justify-between">
            <div className="relative">
              {profileUser.note && (
                <div className="absolute -top-4 left-1 bg-zinc-800 border border-zinc-700 text-[10px] text-zinc-200 px-2.5 py-1 rounded-2xl shadow-md max-w-[115px] truncate z-10">
                  {profileUser.note}
                </div>
              )}
              <div className="w-20 h-20 rounded-full p-[2.5px] bg-gradient-to-tr from-sky-500 via-indigo-500 to-emerald-400">
                <img
                  src={profileUser.avatar}
                  alt={profileUser.name}
                  className="w-full h-full rounded-full object-cover border-2 border-black"
                />
              </div>
              {isOwnProfile && (
                <button
                  onClick={() => {
                    setSettingsSubTab('edit');
                    setShowSettingsDrawer(true);
                  }}
                  className="absolute bottom-0 right-0 w-6 h-6 bg-white text-black rounded-full flex items-center justify-center border-2 border-black font-bold text-sm"
                >
                  +
                </button>
              )}
            </div>

            <div className="flex-1 flex justify-around ml-4 text-center">
              <div>
                <p className="font-bold text-base">{userPosts.length + 12
