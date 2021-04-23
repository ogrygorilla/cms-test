"use strict";

const fs = require("fs");
const path = require("path");

class HomeController {
  constructor(client) {
    this.req = client.req;
    this.res = client.res;
  }

  showHomePage() {
    const homePage = fs.readFileSync(path.resolve(__dirname, '../pages/home.html'), "utf8");

    //console.log("HomePage content: ", homePage);
    return homePage;
  }
}

module.exports = HomeController;
