"use strict";

class Container {
  constructor() {
    this.dependencies = {};
  }

  // dependency -> class name
  // args -> arguments to be called in constructor
  set(dependency, args) {
    this.dependencies[dependency] = new dependency(...args);
  }

  get(dependency) {
    if (!this.dependencies[dependency]) {
      throw new Error(`No instance of ${dependency} found`);
    }
    return this.dependencies[dependency];
  }
}

module.exports = Container;