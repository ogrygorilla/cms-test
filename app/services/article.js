'use strict';

const ObjectId = require('mongodb').ObjectId;
class ArticleService {
    constructor(connectionMongoDB) {
        this.articleRepository = connectionMongoDB.client;
    };

    async findArticleById(articleId) {
        const db = await this.articleRepository.db("cmstest");
        const result = await db.collection("articles").findOne({ _id: new ObjectId(articleId) });

        if (result) {
            return result;
        } else {
            console.log(articleId);
            console.log("Article with such id could not be found");
            return false;
        };
    };

    async findArticleByTitle(articleTitle) {
        const db = await this.articleRepository.db("cmstest");
        const result = await db.collection("articles").findOne({ title: articleTitle});

        if (result) {
            return result;
        } else {
            console.log("Article with such title could not be found");
            return false;
        };
    };

    async findAllArticles() {
        const db = await this.articleRepository.db("cmstest");
        const result = await db.collection("articles").find();

        if (result) {
            return result.toArray();
        } else {
            console.log("Articles could not be found");
            return false;
        };
    }

    async createArticle(article) {
        const result = await this.articleRepository.db("cmstest").collection("articles").insertOne(article);

        if (result) {
            return result.insertedId;
        } else {
            console.log("Article could not be created");
            return false;
        };

    };

    async deleteArticleById(articleId) {
        const db = await this.articleRepository.db("cmstest");
        const result = await db.collection("articles").deleteOne({ _id: new ObjectId(articleId) });

        if (result) {
            return result;
        } else {
            console.log(articleId);
            console.log("Article with such id could not be deleted");
            return false;
        };
    };

    async updateArticleById(articleId, article) {
        const db = await this.articleRepository.db("cmstest");
        const result = await db.collection("articles").updateOne({ _id: new ObjectId(articleId)}, { $set: article });

        if (result) {
            return result;
        } else {
            console.log(articleId);
            console.log("Article with such id could not be updatet");
            return false;
        };
    };
};

module.exports = ArticleService;