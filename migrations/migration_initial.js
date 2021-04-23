"use strict";

const Connection = require("../database/connection");

class MigrationInitial {
  constructor() {
    this.connection = new Connection();
    try {
      this.createUsers();
      this.createArticles()
        .then(() => {
          this.connection.close();
        });
      console.log("Migrating successful, check your database");
    } catch (e) {
      console.log("Error by migrating: ", e);
    }
  }

  async dropUsers() {
    let sql = `
        DROP TABLE IF EXISTS users;
    `;
    await this.connection.query(sql);
  }

  async dropArticles() {
    let sql = `
        DROP TABLE IF EXISTS articles;
    `;
    await this.connection.query(sql);
  }

  async createUsers() {
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
    await this.connection.query(sql);
  }

  async createArticles() {
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
    await this.connection.query(sql);
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
