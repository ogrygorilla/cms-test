"use strict";

// const storage = require("./storage");

const TOKEN_LENGTH = 32;
const ALPHA_UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const ALPHA_LOWER = "abcdefghijklmnopqrstuvwxyz";
const ALPHA = ALPHA_UPPER + ALPHA_LOWER;
const DIGIT = "0123456789";
const ALPHA_DIGIT = ALPHA + DIGIT;

const generateToken = () => {
  const base = ALPHA_DIGIT.length;
  let key = "";
  for (let i = 0; i < TOKEN_LENGTH; i++) {
    const index = Math.floor(Math.random() * base);
    key += ALPHA_DIGIT[index];
  }
  return key;
};

class Session {
  constructor() {
    this.sessions = {};
  }

  start(userId) {
    const token = generateToken();
    //this.sessionRepository.create(userId, token);
    this.sessions[userId] = token;
  }

  end(userId) {
    if(this.sessions[userId]) {
      this.sessions[userId] = null;
    }
  }

  getToken(userId) {
    if (this.sessions[userId]) {
      return this.sessions[userId];
    } else {
      return null;
    }
  }
  // restore(token) {
  //   const userId = this.sessionRepository.findByField("token", token);
  //   if(!!userId) {
  //     this.sessions[userId] = token;
  //   }
  // }
}

module.exports = Session;
