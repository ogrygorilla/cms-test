'use strict';

const Connection = require("../../database/connectionMySQL");

class ArticleRepository {
    constructor(connection) {
        this.connection = connection;
    };

    add() {}

    getByField() {}

    getAll() {}

    update() {}

    delete() {}
};

module.exports = ArticleRepository;