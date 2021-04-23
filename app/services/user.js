"use strict";

const UserEntity = require("../entities/user");

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  create(user) {
    // this.user = new UserEntity(user.email, user.password);
    this.userRepository.add(user);
  }

  async findUserByEmail(email) {
    const user = await this.userRepository.getByField("email", email);
    return user;
  }
}

module.exports = UserService;
