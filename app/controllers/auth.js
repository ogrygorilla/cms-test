"use strict";

const fs = require("fs");
const path = require("path");
class AuthController {
  constructor(client, userService, sessionStorage) {
    this.client = client;
    this.req = client.req;
    this.res = client.res;
    this.userService = userService;
    this.sessionStorage = sessionStorage;
    this.user = {};
  }

  /**
   * Gives an command to the servise to create new user if
   * such email not exists yet
   * @returns string data to be passed to the renderer/view
   */
  async signUp() {
    switch (this.req.method) {
      case "GET":
        const signupPage = fs.readFileSync(
          path.resolve(__dirname, "../pages/signup.html"),
          "utf8"
        );
        return signupPage;
      case "POST":
        let user;
        if (
          this.req.method === "POST" &&
          this.req.body &&
          this.req.body.email
        ) {
          user = await this.userService.findUserByEmail(this.req.body.email);

          console.log(user);

          if (user && user.id) {
            let error = {
              message: "USER_ALREADY_EXISTS"
            }
            return JSON.stringify(error);
          } else {
            let user = {
              email: this.req.body.email,
              password: this.req.body.password,
            };

            this.userService.create(user);
            return  "user registration";
          }
        }
    }
  }

  async signIn() {
    let user;
    if (this.req.body.email && this.req.body.password) {
      user = await this.userService.findUserByEmail(this.req.body.email);
      console.log(user);
      if (user && user.id) {
        this.user = user;
        this.session.start(user.id);
        const token = this.session.getToken(user.id);

        return `user logged in user id: ${
          user.id
        }, token: ${token}, ${JSON.encode(this.user)}`;
      } else {
        return `No user with email: "${this.req.body.email}" found`;
      }
    }
  }

  async signOut() {
    console.log(this.user);
    this.session.end(this.user.id);
    const token = this.session.getToken(this.user.id);
    return `user with this Id: ${this.userId} is loged out, token value: ${token}`;
  }
}

module.exports = AuthController;
