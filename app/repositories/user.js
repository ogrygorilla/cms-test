'use strict';

const { user } = require('../../database/config');
const Connection = require('../../database/connection');

class UserRepository {
    constructor() {
        this.connection = new Connection();
    };

    add(user) {
        let sql = `
            INSERT INTO users
            SET email = "${user.email}",
                password = "${user.password}"
                ;
        `;
        const result = this.connection.query(sql);
        console.log('add user: ', result);
    };

    findOneByLogin(login) {
        let sql = `
            SELECT * FROM users WHERE login = "${login};
        `;

        const user = this.connection.query(sql);
        console.log(user);
        return user;
    };
};

module.exports = UserRepository;