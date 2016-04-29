'use strict';

class HomeController {
    constructor(app) {
        app.get('/', this.index);
    }

    index(req, res) {
        res.render('home/index', {
            title: 'Time Tracker'
        });
    }
}

module.exports = HomeController;