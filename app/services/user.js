'use strict';

const UserRepository = require('../repositories/user');
const UserEntity = require('../entities/user');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    create(user) {
        this.user = new UserEntity(user.email, user.password);
        this.userRepository.add(this.user);
    };

    
};

module.exports = UserService;