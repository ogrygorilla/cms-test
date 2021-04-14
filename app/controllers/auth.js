"use strict";

const UserService = require("../services/user");
const SessionService = require("../services/session");
class AuthController {
  constructor(client) {
    this.client = client;
    this.req = client.request;
    this.res = client.response;
    this.userService = new UserService();
    this.sessionService = new SessionService(client);
  }

  /**
   * Gives an command to the servise to create new user if
   * such email nor exists yet
   * @returns string data to be passed to the renderer/viewq
   */
  async register() {
    let userExists;
    if (this.req.body.email && this.req.body.password) {
      userExists = await this.userService.findUserByEmail(this.req.body.email);
      //}

      console.log(userExists);

      if (userExists) {
        return "User with such email already exists, please pick an another email address";
      } else {
        let user = {
          email: this.req.body.email,
          password: this.req.body.password,
        };

        this.userService.create(user);
        return "user registration";
      }
    }

    throw new Error("No proper user data in request body");
  }

  async login() {
    let user;
    if (this.req.body.email && this.req.body.password) {
      user = await this.userService.findUserByEmail(this.req.body.email);
      if (user && user.id) {
        console.log(user);  
        this.sessionService.start(client);
        return 'user logged in see your cookies';
        // console.log("user im contorller: ", user);
        // Session.start(user.id); nativeStorage set token(id, token);
        // on 'finish' -> sessionStorage.set(id, token)
      } else {
        return `No user with email: "${this.req.body.email}" found`;
      }
      // session.start (token etc), check for session if create article
    }
  };

  async logout() {
    this.sessionService.endSession();
    return 'user loged out';
  };
}

module.exports = AuthController;
