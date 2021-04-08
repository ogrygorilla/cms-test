"use strict";

//db user: cms_user, password: cms_password, port:3306. host: 127.0.0.1, database: cmstest
const port = 3333;

const http = require("http");

const Router = require("./core/router");
const Container = require("./core/container");

const HomeController = require("./app/controllers/home");
const ArticleController = require("./app/controllers/article");
const AuthController = require("./app/controllers/auth");
const Connection = require("./database/connection");

const router = new Router();
const container = new Container();
const connection = new Connection();

connection.open();

router.set("/", HomeController, "showHomePage");
router.set("/article", ArticleController, "showArticlePage");
router.set("/article/edit", ArticleController, "editArticle");
router.set("/article/create", ArticleController, "createArticle");
router.set("/article/delete", ArticleController, "deleteArticle");
router.set("/signup", AuthController, "register");
router.set("/signin", AuthController, "login");

const server = http.createServer((req, res) => {
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });
  req.on("end", () => {
    if (data) {
      data.toString();
      const body = JSON.parse(data);
      req.body = body;
    }

    const client = {
      request: req,
      response: res,
    };

    if (req.url !== "/favicon.ico") {
      const handler = router.get(req.url);
      const controller = new handler[0](client);
      const action = handler[1];
      const result = controller[action]();
      res.end(result);
    }
  });
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
