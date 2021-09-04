"use strict";

const ConnectionMySQL = require("../database/connectionMySQL");

class MigrationInitialMySQL {
  constructor() {
    this.connection = new ConnectionMySQL({
      connectionLimit: 5,
      host: "localhost",
      port: 3306,
      database: "cmstest",
      user: "cms_user",
      password: "cms_password",
      waitForConnections: true,
    });
    try {
      // this.dropArticles();
      // this.dropUsers();
      this.createUsers()
      // this.createArticles()
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

  // async createArticles() {
  //   let sql = `
  //       CREATE TABLE IF NOT EXISTS articles(
  //           id INT AUTO_INCREMENT,
  //           title VARCHAR(255),
  //           content VARCHAR(255),
  //           author INT NOT NULL,
  //           created_at DATE DEFAULT CURRENT_TIMESTAMP,
  //           PRIMARY KEY(id),
  //           FOREIGN KEY(author) REFERENCES cmstest.users(id) ON DELETE CASCADE ON UPDATE CASCADE
  //       );
  //   `;
  //   await this.connection.query(sql);
  // }
}

new MigrationInitialMySQL();
