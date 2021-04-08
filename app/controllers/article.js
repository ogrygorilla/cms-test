"use strict";

const ArticleService = require("../services/article");

class ArticleController {
  constructor(client) {
    this.req = client.request;
    this.res = client.response;
    this.articleService = new ArticleService();
  }

  showArticlePage() {
    this.articleService.getAll();
    return "Hello from Article detail view!";
  }

  editArticle() {
    this.articleService.update();
    return "Article will be updated!";
  }

  createArticle() {
    // if (this.req.body.title && this.req.body.content) {
    //   let article = {
    //     title: this.req.body.title,
    //     content: this.req.body.content,
    //   };

    //   // this.articleService.create(article);
    // }
    return "Article will be created!";
  }

  deleteArticle() {
    this.articleService.delete();
    return "Article will be deleted!";
  }
}

module.exports = ArticleController;
