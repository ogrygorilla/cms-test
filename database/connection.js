"use strict";

const mysql = require("mysql2");
const config = require("./config");

class Connection {
  constructor() {
    this.pool = mysql.createPool(config);
    this.promisePool = this.pool.promise();
  }
  open() {
    this.pool.connect((err) => {
      if (err) {
        return console.error("error:" + err.message);
      }
    });
    console.log("Connection to database established");
  }

  async query(sqlQuery) {
    return await this.promisePool.query(sqlQuery)
      .then((results) => {
        //console.log("results: ", results[0]);
        return results[0];
      })
      .catch((err) => {
        console.log(`SQL query could not be executed, error: ${err}`);
      });
  }

  close() {
    this.pool.end((err) => {
      if (err) {
        return console.log(err.message);
      }
    });
    console.log("Connection to database closed");
  }
}

module.exports = Connection;
