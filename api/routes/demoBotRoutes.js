'use strict';
module.exports = function(app) {
  var demoBot = require('../controllers/demoBotController');

  // demoBot Routes
  app.route('/howareyou')
    .get(demoBot.list_all_dangers)
    .post(demoBot.list_all_dangers);
};