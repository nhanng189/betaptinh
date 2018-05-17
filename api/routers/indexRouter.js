'use strict'
const indexControler = require('../controllers/indexController');
module.exports = (app) => {
    app.route('/')
        .get(indexControler.loadpage);

    app.route('/operation/sum')
        .post(indexControler.sum);

    app.route('/operation/sub')
        .post(indexControler.sub);

    app.route('/operation/multi')
        .post(indexControler.multi);

    app.route('/operation/div')
        .post(indexControler.div);
}
