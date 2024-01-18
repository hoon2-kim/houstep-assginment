# 📄 houstep 사전과제

---

## DDL

```bash
CREATE DATABASE houstep;

use houstep;

SET time_zone='Asia/Seoul';

CREATE TABLE `customer` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    rating VARCHAR(5) NOT NULL
);

CREATE TABLE `order` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_date DATE NOT NULL,
    order_type ENUM('order','refund') NOT NULL,
    amount INT NOT NULL,
    fk_customer_id INT NOT NULL
);

ALTER TABLE `order` ADD FOREIGN KEY(fk_customer_id) REFERENCES customer(id);
```
