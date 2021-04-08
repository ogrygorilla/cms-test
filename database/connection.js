'use strict';

const mysql = require('mysql');
const config = require('./config');

class Connection {
    constructor() {
        this.connection = mysql.createConnection(config);
    }
    open() {
        this.connection.connect((err) => {
            if (err) {
                return console.error('error:' + err.message);
            };
        });
        console.log('Connection to database established');
    };

    query(sqlQuery) {
        return this.connection.query(sqlQuery, (err, results, fields) => {
            if (err) {
                console.log(err.message);
            }
            return [results, fields];
        });
    };

    close() {
        this.connection.end((err) => {
            if (err) {
                return console.log(err.message);
            }
        });
        console.log('Connection to database closed');
    }
};

module.exports = Connection;