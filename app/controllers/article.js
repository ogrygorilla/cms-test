"use strict";

const fs = require("fs");
const path = require("path");
const { title } = require("process");

class ArticleController {
  constructor(client, articleService) {
    this.req = client.req;
    this.res = client.res;
    this.articleService = articleService;
  }

  async createArticle() {
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
        let data;
        if (await this.articleService.findArticleByTitle(this.req.body.title)) {
          console.log("Article with such title already exists");
          data = { message: "Article with such title already exists" };
          console.log("article in controller:");
        } else {
          const article = {
            title: this.req.body.title,
            content: this.req.body.content,
            author: this.req.body.author,
          };
          data = await this.articleService.createArticle(article);
        }
        this.res.setHeader("Content-Type", "application/json");
        this.res.write(JSON.stringify(data));
        this.res.end();
        // check if post with such title already exists if yes -> send message on front
        // if not, create new item in the collection
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
