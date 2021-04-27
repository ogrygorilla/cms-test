"use strict";

const mongoClient = require("mongoDB").MongoClient;

class ConnectionMongoDB {
  constructor(config) {
    this.url = config.url;
    this.options = config.options;
    this.connect();
  }

  async connect() {
    const client = await mongoClient
      .connect(this.url, this.options)
      .catch((err) => console.log("MongoDB connection error: ", err));
    if (client) {
        console.log("MongoDB connected");
        const db = await client.db("cmstest");
        const cursor = await db.collection("testProducts").find();
        const result = await cursor.toArray();
        console.log("testProducts collection: ", result);

    }
  }
}

module.exports = ConnectionMongoDB;
