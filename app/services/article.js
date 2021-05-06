'use strict';
class ArticleService {
    constructor(connectionMongoDB) {
        //this.user = new UserEntity();
        this.articleRepository = connectionMongoDB.client;
    };

    async findArticleByTitle(articleTitle) {
        //console.log(this.articleRepository);
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
            console.log("article created: ", result);
            return result.insertedId;
        } else {
            console.log("Article could not be created");
            return false;
        };

    };

    update() {

    };

    delete() {

    };
};

module.exports = ArticleService;