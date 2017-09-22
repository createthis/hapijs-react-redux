# Hapi.JS React Redux demo project
Hapi.js + Sequelize backend with React + Redux front end

# Warning
Do not install npm 5.3. There is a nasty bug: https://github.com/npm/npm/issues/17858#issuecomment-319063545
Instead, stick with 5.2.0 for now. If you need to downgrade:
```bash
npm i -g npm@5.2
```

# Getting Started

```bash
npm install
./node_modules/.bin/sequelize db:migrate
./node_modules/.bin/sequelize db:seed:all
npm test
npm start
```

Then visit <http://localhost:3000>

# Structure
* /client contains react/redux client
* /test/client contains react/redux tests
* /test/models contain sequelize model unit tests
* /test/services contain service unit tests

# Development

This project uses SequelizeJS to manage the DB.

To create a migration called "SSN":

```bash
./node_modules/.bin/sequelize migration:create --name SSN
vim migrations/20170919194522-SSN.js
```

Next, run the migration:

```bash
./node_modules/.bin/sequelize db:migrate
```

Then, generate a bare model file in the models directory from that migration (save
time by not writing boilerplate by hand):

```bash
./node_modules/.bin/sequelize-auto -h localhost -d db.development.sqlite -e sqlite -o ./models -t products
```
