"use strict";

const UserEntity = require("../entities/user");

class UserRepository {
  constructor(connection) {
    this.connection = connection;
  }

  async add(user) {
    let sql = `
            INSERT INTO users
            SET email = "${user.email}",
                password = "${user.password}"
                ;
        `;
    const result = await this.connection.query(sql);
    console.log("add user: ", result);
    return;
  }

  async getByField(field, value) {
    let sql = `
               SELECT column_name 
               FROM INFORMATION_SCHEMA.columns
               WHERE table_schema = 'cmstest' 
               AND table_name = 'users';
               `;

    let rows = await this.connection.query(sql);
    let iterator = rows.values();
    let user = new UserEntity();
    console.log("user in repo: ", user);

    for (let entry of iterator) {
      if (entry.column_name === field) {
        let sql = `
          SELECT *
          FROM users
          WHERE ${field} = "${value}";
        `;

        let rows2 = await this.connection.query(sql);
        if (rows2[0]) {
          user.setId(rows2[0]['id']);
          user.setEmail(rows2[0]['email']);
          user.setPassword(rows2[0]['password']);
          user.setRole(rows2[0]['role']);
        }
      }
    };

    return user;
  }
}

module.exports = UserRepository;
