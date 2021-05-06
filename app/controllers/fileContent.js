"use strict";

const fs = require("fs");
const path = require("path");

class FileContentController {
  constructor(client) {
    this.req = client.req;
    this.res = client.res;
  }

  getFileContent(fileAdditionalPath) {
    console.log(this.req.method);
    switch (this.req.method) {
      case "GET":
        const fileContent = fs.readFileSync(
          "C:/Users/Administrator/Projects/plain/nodejs/cms" + fileAdditionalPath,
          "utf8"
        );
        this.res.write(fileContent);
        this.res.end();
        break;
    }
    //console.log("HomePage content: ", homePage);
  }
}

module.exports = FileContentController;
