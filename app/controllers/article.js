"use strict";

const fs = require("fs");
const path = require("path");

class ArticleController {
  constructor(client, articleService) {
    this.req = client.request;
    this.res = client.response;
    this.articleService = articleService;
  }

  createArticle() {
    switch (this.req.method) {
      case "GET":
        const signinPage = fs.readFileSync(
          path.resolve(__dirname, "../pages/createArticle.html"),
          "utf8"
        );
        this.res.write(signinPage);
        this.res.end();
        break;
      case "POST":
        // create article here, we get userId , title, content from client
        break;
    }
  }

  showArticlePage() {
    switch (this.req.method) {
      case "GET":
        const signinPage = fs.readFileSync(
          path.resolve(__dirname, "../pages/article.html"),
          "utf8"
        );
        this.res.write(signinPage);
        this.res.end();
        break;
    }
  }

  editArticle() {
    switch (this.req.method) {
      case "GET":
        // show edit article page, which should be similar to createArticle page
        // but sending differen requests
        const signinPage = fs.readFileSync(
          path.resolve(__dirname, "../pages/createArticle.html"),
          "utf8"
        );
        this.res.write(signinPage);
        this.res.end();
        break;
      case "PATCH":
        // update article here
        // we get userId(local storage) and articleId(event target) from front end
        // article must be existing, we just puuting new values to it, were is = article id, author = userId
        break;
    }
  }

  deleteArticle() {
    switch (this.req.method) {
      case "DELETE":
        // delete article here, get artcileId(event target) from frontend
        this.res.write(signinPage);
        this.res.end();
        break;
    }
  }
}

module.exports = ArticleController;
