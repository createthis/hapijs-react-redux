const Sequelize = require("sequelize");
module.exports = {
  development: {
    dialect: "sqlite",
    storage: "./db.development.sqlite",
    seederStorage: "sequelize",
    underscored: true,
    //logging: console.log,
  },
  test: {
    dialect: "sqlite",
    storage: ':memory:',
    underscored: true,
    //logging: console.log,
    logging: false
  },
  production: {
    dialect: "sqlite",
    storage: "./db.production.sqlite",
    seederStorage: "sequelize",
    /* "logging": console.log, */
  }
}
