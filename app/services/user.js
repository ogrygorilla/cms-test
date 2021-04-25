"use strict";

const UserEntity = require("../entities/user");

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  // check if password matches here, codierung/ decodierung also here, or on the repository level?

  async create(user) {
    // this.user = new UserEntity(user.email, user.password);
    try {
       await this.userRepository.add(user);
       return true;
    } catch (e) {
      return false;
    }
  }

  async findUserByEmail(email) {
    const user = await this.userRepository.getByField("email", email);
    console.log("user in service: ", user);
    if (!!user && !!user.id) {
      return user;
    } else {
      return {};
    }
  }

  async signIn(email, password) {
    const user = await this.findUserByEmail(email);
    console.log(user, password);
    if (!!user && user.password === password) {
      return { userId: user.id };
    } else {
      return {};
    }
  }
}

module.exports = UserService;
