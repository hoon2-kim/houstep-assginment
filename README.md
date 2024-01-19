# 📄 houstep 사전과제

---

## 실행방법

```
yarn install

.env 입력

yarn start:dev
```

## Local환경 Swagger 주소

http://localhost:3333/api-docs

## DDL

```
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
