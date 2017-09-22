'use strict';

var factory = require('factory-girl');
const adapter = new factory.SequelizeAdapter();
var factory = factory.factory;
factory.setAdapter(adapter);

var Models = require('../models');

// clean the factory state - necessary for mocha watch
factory.cleanUp();
factory.factories = [];

// define factories
require('./factories')(factory, Models);

/* uncomment to see UnhandledPromiseRejectionWarning stack traces */
/*
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p);
  console.log('reason:', reason);
});
*/

beforeEach(function (done) {
  Models.sequelize.sync({ force: true }).then(function () {
    done();
  });
});

module.exports = {
  factory: factory,
  Models: Models
}
