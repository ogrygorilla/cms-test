'use strict';

class HomeController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    
    showHomePage() {
        return 'Hello from Homepage!';
    }
}

module.exports = HomeController;