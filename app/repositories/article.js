'use strict';

const Connection = require("../../database/connectionMySQL");

class ArticleRepository {
    constructor() {
        this.connection = new Connection();
    };

    add() {}

    getByField() {}

    getAll() {}

    update() {}

    delete() {}
};

module.exports = ArticleRepository;