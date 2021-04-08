'use strict';

const ArticleEntity = require("../entities/article");
const ArticleRepository = require("../repositories/article");

const UserEntity = require("../entities/user");

class ArticleService {
    constructor() {
        this.user = new UserEntity();
        this.articleRepository = new ArticleRepository();
    };

    getAll() {

    };

    create(article) {
        // article.author = this.user.id;
        // let articleEntity = new ArticleEntity(article);
        // this.articleRepository.add();
    };

    update() {

    };

    delete() {

    };
};

module.exports = ArticleService;