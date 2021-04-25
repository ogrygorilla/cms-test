"use strict";

const fs = require("fs");
const path = require("path");

class NotFoundController {
  constructor(client) {
    this.req = client.req;
    this.res = client.res;
  }

  showNotFoundPage() {
    console.log(this.req.method);
    switch (this.req.method) {
      case "GET":
        const notFoundPage = fs.readFileSync(
          path.resolve(__dirname, "../pages/notFound.html"),
          "utf8"
        );
        this.res.write(notFoundPage);
        this.res.end();
        break;
    }
    //console.log("HomePage content: ", homePage);
  }
}

module.exports = NotFoundController;
