"use sctrict";

const roles = {
  visitor: 0,
  user: 1,
  admin: 2,
};
class UserEntity {
  constructor() {
    this.id = null;
    this.email = null;
    this.password = null;
    this.role = 0;
  }

  getId() {
    return this.id;
  }

  setId(id) {
    this.id = id;
  }

  getEmail() {
    return this.email;
  }

  setEmail(email) {
    this.email = email;
  }

  getPassword() {
    return this.email;
  }

  verifyPassword(password) {
    return this.password === password;
  }

  setPassword(password) {
    this.password = password;
  }

  getRole() {
    return this.role;
  }

  setRole(role) {
    this.role = role;
  }
}

module.exports = UserEntity;
