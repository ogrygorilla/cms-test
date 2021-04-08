'use sctrict';

const roles = {
    visitor: 0,
    user: 1,
    admin: 2,
};
class UserEntity {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    };

    getId() {
        return this.id;
    };

    setId(id) {
        this.id = id;
    };

    getEmail() {
        return this.email;
    }

    getRole() {
        return this.role;
    };

    verifyPassword(password) {
        return this.password === password;
    }
};

module.exports = UserEntity;