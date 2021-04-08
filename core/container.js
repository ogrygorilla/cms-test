"use strict";

class Container {
  constructor() {
    this.dependencies = {};
    this.factories = {};
  }

  setDependency(key, value) {
    this.dependencies[key] = value;
  }

  setFactory(key, value) {
    this.factories[key] = value;
  }

  get(key, args) {
    if (!this.dependencies[key]) {
      const factory = this.factories[key];
      if (factory) {
        this.dependencies[key] = this.inject(factory, args);
      } else {
        throw new Error("No module found for: " + key);
      }
    }
    return this.dependencies[key];
  }

  inject(factory, args = []) {
      const fnArgs = args.map((arg) => this.get(arg));
      return new factory(...fnArgs);
  }
}

module.exports = Container;
