const config = {
  mySQL: {
    connectionLimit: 5,
    host: "localhost",
    port: 3306,
    database: "cmstest",
    user: "cms_user",
    password: "cms_password",
    waitForConnections: true,
  },
  mongoDB: {
      url: "mongodb://127.0.0.1:27017", // ?compressors=zlib&gssapiServiceName=mongodb
      options: {
        useUnifiedTopology: true,
      }
  },
};

module.exports = config;
