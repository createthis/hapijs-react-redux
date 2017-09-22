'use strict';

// home routes
var Joi = require('joi');
var HomeController = require('../controllers/home');

exports.register = function(server, options, next) {
  // Setup the controller
  var homeController = new HomeController(options.database);

  // Binds all methods
  // similar to doing `homeController.index.bind(homeController);`
  // when declaring handlers
  server.bind(homeController);

  // Declare routes
  server.route([
    {
      method: 'GET',
      path: '/home',
      config: {
        handler: homeController.index,
      }
    },
  ]);

  next();
}

exports.register.attributes = {
  name: 'routes-home',
  version: '1.0.0'
};
