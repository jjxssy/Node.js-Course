-- Create database
CREATE DATABASE IF NOT EXISTS `products_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Select database
USE `products_db`;

-- Creating the product table
CREATE TABLE IF NOT EXISTS `products` (
 `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 `name` VARCHAR(255) NOT NULL,
 `price` DECIMAL(10, 2)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Optional: insert test data
INSERT INTO `products` (`id`, `name`, `price`) VALUES
(1, 'Notebook', 4.99),
(2, 'Pen', 1.25),
(3, 'Backpack', 29.95);