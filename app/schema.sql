CREATE DATABASE nexttestdb;
USE nexttestdb;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE products (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  name            VARCHAR(200) NOT NULL,
  category        VARCHAR(100) NOT NULL,
  sub             VARCHAR(200),
  weight          VARCHAR(100),
  original_price  DECIMAL(10,2),
  sale_price      DECIMAL(10,2),
  starts_from     DECIMAL(10,2),
  tag             VARCHAR(100),
  discount        INT,
  customisable    BOOLEAN DEFAULT false,
  image_url       VARCHAR(500),
  is_active       BOOLEAN DEFAULT true,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE users ADD COLUMN role ENUM('user', 'admin') DEFAULT 'user';
UPDATE users SET role = 'admin' WHERE email = 'admin@gmail.com';