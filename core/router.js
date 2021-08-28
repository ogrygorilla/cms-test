"use strict";

class Router {
  constructor() {
    this.routes = {};
  }

  get(url) {
    let parsedUrl;

    if (url.includes("?")) {
      parsedUrl = url.replace("?", "");
      return this.routes[parsedUrl];
    } else if (this.routes[url]) {
      return this.routes[url];
    } else if (url.includes("/article/edit/")) {
      return this.routes["/article/edit"];
    } else if (url.includes("/article/") && !url.includes("/article/delete")) {
      return this.routes["/article"];
    }
  }

  set(url, controller, action) {
    this.routes[url] = [controller, action];
  }
}

module.exports = Router;


if (this.routes) {
  console.dir(this.routes);
  console.log("Route not found");
}
// console.log(parsedUrl);
// console.log(url);
return false;
// setParam(url, param) {
//   this.routes[url][2] = [param];
// }

// if (url.includes("/article/edit/")) {
// get aticle id from url like: /article/edit/:id
// const param = url.split("/")[3];
// set this url to corresponding route handler as parameter
// this.setParam("/article/edit", param);
// }

// if (url.includes("/article/delete/")) {
// get aticle id from url like: /article//:id
//const param = url.split("/")[3];
// set this url to corresponding route handler as parameter
// this.setParam("/article/delete", param);

// }

// if (url.includes("/article/")) {
// get aticle id from url like: /article/:id
// const param = url.split("/")[2];
// set this url to corresponding route handler as parameter
// this.setParam("/article", param);
// }
