"use strict";

const fs = require("fs");
const path = require("path");

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

  async showArticlePage() {
    switch (this.req.method) {
      case "GET":
        const articlePage = fs.readFileSync(
          path.resolve(__dirname, "../pages/article.html"),
          "utf8"
        );
        this.res.write(articlePage);
        this.res.end();
        break;
    }
  }

  async editArticle() {
    switch (this.req.method) {
      case "PUT":
        let data;
        let article = {
          title: this.req.body.title,
          content: this.req.body.content,
          author: this.req.body.author
        };

        if (await this.articleService.updateArticleById(this.req.body._id, article)) {
          data = { message: "Article successfully updated" };
        }
        this.res.setHeader("Content-Type", "application/json");
        this.res.write(JSON.stringify(data));
        this.res.end();
        break;
    }
  }

  async deleteArticle() {
    switch (this.req.method) {
      case "DELETE":
        // delete article here, get artcileId(event target) from frontend
        let data;
        if (await this.articleService.deleteArticleById(this.req.body.articleId)) {
          data = { message: "Article successfully deleted" };
        }
        this.res.setHeader("Content-Type", "application/json");
        this.res.write(JSON.stringify(data));
        this.res.end();
        break;
    }
  }

  async getAllArticles() {
    switch (this.req.method) {
      case "GET":
        // delete article here, get artcileId(event target) from frontend
        let data = await this.articleService.findAllArticles();
        data = data ? data : {};
        this.res.setHeader("Content-Type", "application/json");
        this.res.write(JSON.stringify(data));
        this.res.end();
        break;
    }
  }
}

module.exports = ArticleController;
