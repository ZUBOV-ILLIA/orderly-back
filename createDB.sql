CREATE DATABASE orderly_database;

    USE orderly_database;

        CREATE TABLE orders (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            date DATETIME NOT NULL,
            description TEXT
        );

        CREATE TABLE products (
            id INT AUTO_INCREMENT PRIMARY KEY,
            serialNumber INT NOT NULL UNIQUE,
            isNew TINYINT NOT NULL,
            photo VARCHAR(255),
            title VARCHAR(255) NOT NULL,
            type VARCHAR(255),
            specification TEXT,
            guarantee_start DATETIME,
            guarantee_end DATETIME,
            date DATETIME NOT NULL,
            order_id INT,
            FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
        );

        CREATE TABLE prices (
            id INT AUTO_INCREMENT PRIMARY KEY,
            product_id INT NOT NULL,
            value DECIMAL(10, 2) NOT NULL,
            symbol VARCHAR(3) NOT NULL,
            isDefault TINYINT NOT NULL,
            FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
        );