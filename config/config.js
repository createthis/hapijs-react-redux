module.exports = {
  "development": {
    "dialect": "sqlite",
    "storage": "./db.development.sqlite",
    "seederStorage": "sequelize",
    /* "logging": console.log, */
  },
  "test": {
    "dialect": "sqlite",
    "storage": "./db.test.sqlite",
    "logging": false
  },
  "production": {
    "dialect": "sqlite",
    "storage": "./db.production.sqlite",
    "seederStorage": "sequelize",
    /* "logging": console.log, */
  }
}
