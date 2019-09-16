'use strict';
module.exports = function(app) {
  var demoBot = require('../controllers/demoBotController');

  // demoBot Routes
  app.route('/dangers')
    .get(demoBot.list_all_dangers);
};