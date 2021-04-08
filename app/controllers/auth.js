'use strict';

const UserService = require('../services/user');

class AuthController {
    constructor(client) {
        this.req = client.request;
        this.res = client.response;
        this.userService = new UserService();
    }

    register() {
        if (this.req.body.email && this.req.body.password) {
            let user = {
                email: this.req.body.email,
                password: this.req.body.password
            };

            this.userService.create(user);
            return 'user registration';
        }

        throw new Error('No user data in request body');
    };

    login() {}
};

module.exports = AuthController;