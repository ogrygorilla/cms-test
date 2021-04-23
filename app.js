"use strict";

//db user: cms_user, password: cms_password, port:3306. host: 127.0.0.1, database: cmstest
const port = 3333;

const http = require("http");

const DbConfig = require("./database/config");
const Connection = require("./database/connection");

const Router = require("./core/router");
const Container = require("./core/container");
const Client = require("./core/client");

const HomeController = require("./app/controllers/home");

const AuthController = require("./app/controllers/auth");
const UserService = require("./app/services/user");
const SessionStorage = require("./app/storage/session");
const UserRepository = require("./app/repositories/user");

const ArticleController = require("./app/controllers/article");

const router = new Router();
const container = new Container();

router.set("/", HomeController, "showHomePage");
router.set("/signup", AuthController, "signUp");
router.set("/signin", AuthController, "signIn");
router.set("/signout", AuthController, "signOut");
router.set("/article", ArticleController, "showArticlePage");
router.set("/article/edit", ArticleController, "editArticle");
router.set("/article/create", ArticleController, "createArticle");
router.set("/article/delete", ArticleController, "deleteArticle");

container.set(Connection, [DbConfig]);
const connection = container.get(Connection);

const server = http.createServer(async (req, res) => {
  let requestData = "";
  req.on("data", (chunk) => {
    requestData += chunk;
  });
  req.on("end", async () => {
    if (requestData) {
      requestData.toString();
      req.body = JSON.parse(requestData);
    }

    if (req.url !== "/favicon.ico") {
      container.set(Client, [req, res]);
      container.set(HomeController, [Client]);
      container.set(UserRepository, [connection]);
      container.set(UserService, [container.get(UserRepository)]);
      container.set(SessionStorage, []);
      container.set(AuthController, [
        container.get(Client),
        container.get(UserService),
        container.get(SessionStorage),
      ]);

      const handler = router.get(req.url);
      const controller = container.get(handler[0]);
      const action = handler[1];
      const result = await controller[action]();
      res.end(result);
    }
  });
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
