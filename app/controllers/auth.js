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
        this.res.end(signupPage);
        break;

      case "POST":
        if (this.req.body && this.req.body.email) {
          let user = await this.userService.findUserByEmail(this.req.body.email);
          let data = {};

          console.log(user);

          if (!!user && !!user.id) {
            // this.res.statusCode = 403; // resource with the given definition already exists
            data = {message: "USER_ALREADY_EXISTS"};
          } else {
            let newUser = {
              email: this.req.body.email,
              password: this.req.body.password,
            };

            if (this.userService.create(newUser)){
              // this.res.statusCode = 201; // user created
              data = {message: "USER_CREATED"};
            } else {
              // this.res.statusCode = 500; // internal server error, user couldn't be created
              data = {message: "USER_CANNOT_BE_CREATED"};
            }
          }
          this.res.setHeader("Content-Type", "application/json");
          this.res.write(JSON.stringify(data));
          this.res.end();
        }
        break;
    }
  }

  async signIn() {
    switch (this.req.method) {
      case "GET":
        const signinPage = fs.readFileSync(
          path.resolve(__dirname, "../pages/signin.html"),
          "utf8"
        );
        this.res.write(signinPage);
        this.res.end();
        break;

      case "POST":
        if (this.req.body.email && this.req.body.password) {
          let data = await this.userService.signIn(
            this.req.body.email,
            this.req.body.password
          );

          console.dir(!data.userId);

          if (!data.userId) {
            // this.res.statusCode = 200; // OK
            data = {message: "SIGN_IN_FAILED"};
          }

          console.log("data in controller: ", data);
          this.res.setHeader("Content-Type", "application/json");
          this.res.write(JSON.stringify(data));
          this.res.end();
        }
        break;
    }
  }

  // async signOut() {
  //   console.log(this.user);
  //   this.session.end(this.user.id);
  //   const token = this.session.getToken(this.user.id);
  //   return `user with this Id: ${this.userId} is loged out, token value: ${token}`;
  // }
}

module.exports = AuthController;
