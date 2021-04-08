"use strict";

const Connection = require("../database/connection");

class MigrationInitial {
  constructor() {
    this.connection = new Connection();
    this.connection.open();
    //this.dropArticles();
    //this.dropUsers();
    this.createUsers();
    this.createArticles();
    this.connection.close();
  }

  dropUsers() {
    let sql = `
        DROP TABLE IF EXISTS users;
    `;
    this.connection.query(sql);
  }

  dropArticles() {
    let sql = `
        DROP TABLE IF EXISTS articles;
    `;
    this.connection.query(sql);
  }

  createUsers() {
    let sql = `
        CREATE TABLE IF NOT EXISTS users(
            id INT AUTO_INCREMENT,
            email VARCHAR(255),
            password VARCHAR(511),
            role INT DEFAULT 0,
            created_at DATE DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY(id)
        );
    `;
    this.connection.query(sql);
  }

  createArticles() {
    let sql = `
        CREATE TABLE IF NOT EXISTS articles(
            id INT AUTO_INCREMENT,
            title VARCHAR(255),
            content VARCHAR(255),
            author INT NOT NULL,
            created_at DATE DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY(id),
            FOREIGN KEY(author) REFERENCES cmstest.users(id) ON DELETE CASCADE ON UPDATE CASCADE
        );
    `;
    this.connection.query(sql);
  }
}

new MigrationInitial(Connection);

    // let sql = `
    //     CREATE TABLE IF NOT EXISTS users(
    //         id INT AUTO_INCREMENT PRIMARY KEY,
    //         email VARCHAR(255),
    //         password VARCHAR(511),
    //         role INT DEFAULT 0
    //     ) Engine=MariaDB;
    //     CREATE TABLE IF NOT EXISTS articles(
    //         id INT AUTO_INCREMENT PRIMARY KEY,
    //         title VARCHAR(255),
    //         content VARCHAR(511),
    //         author INT NOT NULL,
    //         FOREIGN KEY (author) REFERENCES users(id) ON DELETE CASCADE
    //     ) Engine=InnoMariaDBDB;
    //     `;

    // let sql = `
    //     CREATE TABLE IF NOT EXISTS users(
    //         id INT AUTO_INCREMENT,
    //         email VARCHAR(255),
    //         password VARCHAR(511),
    //         role INT DEFAULT 0,
    //         created_at DATE DEFAULT CURRENT_TIMESTAMP,
    //         PRIMARY KEY(id)
    //     );
    //     CREATE TABLE IF NOT EXISTS articles(
    //         id INT AUTO_INCREMENT,
    //         title VARCHAR(255),
    //         content VARCHAR(255),
    //         author INT NOT NULL,
    //         created_at DATE DAFEULT CURRENT_TIMESTAMP,
    //         PRIMARY KEY(id, author),
    //         FOREIGN KEY(author) REFERENCES users(id)
    //     );
    // `;
    // this.connection.query(sql);
