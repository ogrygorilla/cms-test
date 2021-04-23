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
    }

    console.dir(this.routes);
    console.log(parsedUrl);
    console.log(url);

    throw new Error("Route not found");
  }

  set(url, controller, action) {
    this.routes[url] = [controller, action];
  }
}

module.exports = Router;
