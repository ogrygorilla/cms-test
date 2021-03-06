"use strict";

const fs = require("fs");
const path = require("path");

class HomeController {
  constructor(client, articleService) {
    this.req = client.req;
    this.res = client.res;
    this.articleService = articleService;
  }

  showHomePage() {
    console.log(this.req.method);
    switch (this.req.method) {
      case "GET":
        const homePage = fs.readFileSync(
          path.resolve(__dirname, "../pages/home.html"), 
          "utf8"
        );
        this.res.write(homePage);
        this.res.end();
        break;
    }
    //console.log("HomePage content: ", homePage);
  }
}

module.exports = HomeController;
