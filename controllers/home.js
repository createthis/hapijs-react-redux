'use strict';

var Boom = require('boom');

function HomeController(database) {
  this.database = database;
};

// [GET] /home
HomeController.prototype.index = function(request, reply) {
  this.database.users.underAge().then((result) => {
      reply(result);
  });
};

module.exports = HomeController;

