'use strict';

const Connection = require("../../database/connection");

class ArticleRepository {
    constructor() {
        this.connection = new Connection();
    };

    
    findOne() {

    }

    findAll() {

    }

    add(article) {
        let sql = `
            INSERT INTO articles
                SET title = "${article.title}",
                    content = "${article.content}",
                    author = "${article.author}"
                    ;
        `; 

        const result = this.connection.query(sql);
        console.log('add article: ', result);
    }

    update() {

    }

    delete() {

    }
};

module.exports = ArticleRepository;