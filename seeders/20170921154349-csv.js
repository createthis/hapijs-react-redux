'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    var fs = require('fs');
    var parse = require('csv-parse');

    var parser = parse({delimiter: ','});
    var input = fs.createReadStream('./seed/seed.csv');
    var output = [];
    var line_count = 0;
    var promise = new Promise(function(resolve, reject){


      // Use the writable stream api
      parser.on('readable', function(){
        var record = '';
        while(record = parser.read()){
          line_count = line_count + 1;
          if (line_count < 5 || record[1].length == 0) {
            continue;
          }
          var myrecord = record.slice(0); // closure
          promise.then(function () {
            var record = myrecord;
            var age = parseInt(record[6].replace(',',''));
            if (isNaN(age)) {
              age = 0;
            }
            return queryInterface.bulkInsert('users', [{
              first_name: record[1],
              last_name: record[2],
              email: record[3],
              gender: record[4],
              ip_address: record[5],
              age: age,
            }], {});
          });
        }
      });

      // Catch any error
      parser.on('error', function(err){
        console.log(err.message);
        reject(err.message);
      });

      // When we are done, test that the parsed output matched what expected
      parser.on('finish', function(){
        resolve(true);
      });

      input.pipe(parser);
    });
    return promise;
  },

  down: function (queryInterface, Sequelize) {
    /*
     Add reverting commands here.
     Return a promise to correctly handle asynchronicity.

     Example:
     return queryInterface.bulkDelete('Users', null, {});
     */
  }
};
