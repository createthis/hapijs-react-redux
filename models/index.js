import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';


const NODE_ENV = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.js'))[NODE_ENV];
let sequelize;
let db = {};

if (NODE_ENV === 'test' && process.env.DATABASE_URL) {
  // Paranoia 1: prevent `npm test` from blowing away your production db
  console.log('env test so ignoring DATABASE_URL');
} else if (config.dialect && process.env.DATABASE_URL) {
  // Paranoia 2: prevent `npm test` from blowing away your production db
  console.log(`config.js dialect set for env: ${NODE_ENV} so ignoring DATABASE_URL`);
}
if (!config.dialect && NODE_ENV !== 'test' && process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

export default db;
