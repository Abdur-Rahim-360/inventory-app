-- ✅ Users Table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  blocked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 📦 Inventories Table
CREATE TABLE inventories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 🧩 Fields Table (linked to inventories)
CREATE TABLE fields (
  id INT AUTO_INCREMENT PRIMARY KEY,
  inventory_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL,
  constraints TEXT,
  FOREIGN KEY (inventory_id) REFERENCES inventories(id) ON DELETE CASCADE
);

-- 📝 Items Table (linked to inventories)
CREATE TABLE items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  inventory_id INT NOT NULL,
  custom_id VARCHAR(50) NOT NULL,
  values_json JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (inventory_id) REFERENCES inventories(id) ON DELETE CASCADE
);

-- 🔍 Full-Text Index for Search
ALTER TABLE items ADD FULLTEXT(values_json);
