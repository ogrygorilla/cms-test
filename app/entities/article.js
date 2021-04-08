'use strict';

class ArticleEntity {
    constructor(article) {
        this.title = article.title;
        this.content = article.content;
        this.author = article.author;
    };

    getId() {
        return this.id;
    };

    setId(id) {
        this.id = id;
    }

    getAuthor() {
        return this.author;
    };
};

module.exports = ArticleEntity;