"use strict";

const UNIX_EPOCH = "Thu, 01 Jan 1970 00:00:00 GMT";
const COOKIE_EXPIRE = "Fri, 01 Jan 2200 00:00:00 GMT";
const COOKIE_DELETE = `=deleted; Expires=${UNIX_EPOCH}; Path=/; Domain=`;

class Client {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.token = undefined;
    this.session = null;
    this.preparedCookies = [];
    this.host = this.parseHost(req.headers.host);
    this.cookie = this.parseCookies();
  }

  parseHost(host) {
    if (!host) return "no-host-name-in-http-headers";
    const portOffset = host.indexOf(":");
    if (portOffset > -1) host = host.substr(0, portOffset);
    return host;
  }

  parseCookies() {}
}

module.exports = Client;
