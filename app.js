"use strict";

//db user: cms_user, password: cms_password, port:3306. host: 127.0.0.1, database: cmstest
const port = 3333;

const http = require("http");

// import core modules
const Client = require("./core/client");
const Container = require("./core/container");
const Router = require("./core/router");

// import needed modules for database connection
const DbConfig = require("./database/config");
const ConnectionMySQL = require("./database/connectionMySQL");
const ConnectionMongoDB = require("./database/connectionMongoDB");

// import repositories, which are representing
// data abstraction layer (DAL) of the application
const UserRepository = require("./app/repositories/user");

// import services, which are representing
// business logic layer (BLL) of the application
const ArticleService = require("./app/services/article");
const UserService = require("./app/services/user");

// import controllers, which are representing
// the layer to handle external processes of the application
const ArticleController = require("./app/controllers/article");
const AuthController = require("./app/controllers/auth");
const HomeController = require("./app/controllers/home");
const NotFoundController = require("./app/controllers/notFound");
//const FileContentController = require("./app/controllers/fileContent");

const SessionStorage = require("./app/storage/session");

// initialize routes for the application
const router = new Router();
router.set("/", HomeController, "showHomePage");
router.set("/signup", AuthController, "signUp");
router.set("/signin", AuthController, "signIn");
router.set("/articles", ArticleController, "getAllArticles");
router.set("/article", ArticleController, "showArticlePage");
router.set("/article/create", ArticleController, "createArticle");
router.set("/article/edit", ArticleController, "editArticle");
router.set("/article/delete", ArticleController, "deleteArticle");
// router.set("/@cms/*", FileContentController, "getFileContent");

// initialize container for handling dependencies of the application
const container = new Container();
container.set(ConnectionMySQL, [DbConfig.mySQL]);
const connectionMySql = container.get(ConnectionMySQL);
container.set(ConnectionMongoDB, [DbConfig.mongoDB]);
const connectionMongoDB = container.get(ConnectionMongoDB);

// initialize server for the application and define its behaviour
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
      // initialize repositories
      //container.set(ArticleRepository, [connectionMongoDB]);
      container.set(UserRepository, [connectionMySql]);

      // initialize services
      container.set(ArticleService, [connectionMongoDB]);
      container.set(UserService, [container.get(UserRepository)]);

      // initialize controllers
      container.set(ArticleController, [
        container.get(Client),
        container.get(ArticleService),
      ]);
      container.set(AuthController, [
        container.get(Client),
        container.get(UserService),
        container.get(SessionStorage),
      ]);
      container.set(HomeController, [
        container.get(Client),
        container.get(ArticleService),
      ]);
      container.set(NotFoundController, [container.get(Client)]);

      // consider edge cases
      const routeHandler = router.get(req.url);
      if (!routeHandler) {
        const controller = container.get(NotFoundController);
        const action = "showNotFoundPage";
        controller[action]();
      } else {
        const controller = container.get(routeHandler[0]);
        const action = routeHandler[1];
        controller[action]();
      }
    }
  });
  req.on("err", (err) => {
    console.log("error: ", err);
  });
});

// start application server
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
