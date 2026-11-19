CREATE DATABASE IF NOT EXISTS devnet_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE devnet_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  username VARCHAR(60) NOT NULL UNIQUE,
  contact_type ENUM('gmail', 'phone') NOT NULL,
  contact_value VARCHAR(150) NOT NULL,
  account_type ENUM('personal', 'commercial') NOT NULL DEFAULT 'personal',
  niche VARCHAR(80) NOT NULL DEFAULT 'Dev Fullstack',
  college VARCHAR(120) DEFAULT '',
  followers INT NOT NULL DEFAULT 0,
  is_verified TINYINT(1) NOT NULL DEFAULT 0,
  is_course_creator TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE verification_codes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  contact_value VARCHAR(150) NOT NULL,
  code CHAR(6) NOT NULL,
  expires_at DATETIME NOT NULL,
  used TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  payment_type ENUM('course_subscription', 'hourly_ad') NOT NULL,
  hours_bought INT DEFAULT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  status ENUM('pending', 'paid') NOT NULL DEFAULT 'paid',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
