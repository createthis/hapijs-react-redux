'use strict';
module.exports = function(factory, Models) {
  var normalizedPath = require("path").join(__dirname, ".");

  require("fs").readdirSync(normalizedPath).forEach(function(file) {
    if (file !== "index.js") {
      require('./'+file)(factory, Models);
    }
  });
};
