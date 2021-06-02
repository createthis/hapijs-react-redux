# Hapi.JS React Redux demo project
Hapi.js + Sequelize backend with React + Redux front end

# Getting Started

```bash
brew update
brew install nvm // if not already installed
nvm install v14.16.1
nvm use v14.16.1
nvm alias default v14.16.1
# The next 3 lines are only necessary if you do not have a package-lock.json file for some reason
npm shrinkwrap
mv npm-shrinkwrap.json package-lock.json
npm install # first time - gives security warnings
npm install # second time, npm-force-resolutions clears warnings based on resolutions section from package.json
npm run reloadseed
npm test
npm run dev
```

Then visit <http://localhost:8000>

# Structure

## Backend

We use HapiJS for the server side MVC framework. We use Sequelize for the ORM.

/server.js is the entry point for HapiJS. Everything branches from there.

* /routes contain server side routes
* /models contain the Sequelize models.
* /views contain server side views
* /controllers contain server side controllers
* /migrations contain server side database migrations (see Development section, below)
* /seed is unused, but database seeds would go here.
* /seeders is also unused, but database import scripts (CSV import, for example) might go here.
* /dist production transpiler (babel) cache generated by `npm run build` and used by `npm run serve`

## Frontend

We use React + Redux for the frontend framework.
If you are not familiar with Redux, I strongly recommend watching these short, free, tutorial videos: https://egghead.io/courses/getting-started-with-redux

* /client contains react/redux client
* /client/actions contain redux actions
* /client/components contain redux components (similar to AngularJS directives/components - sorta)
* /client/reducers contain redux reducers

## Tests

* /test/client contains react/redux tests
* /test/models contain sequelize model unit tests
* /test/services contain service unit tests
* /test_helpers/factories contain easy to use database factories to help write tests quickly

# Production

```bash
npm run build
npm run serve
```

# Development

This project uses SequelizeJS to manage the DB.

## Migrations
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

## Seeds
You may decide you want some seed data in the development database when you are doing UI related work.

To create a seed called "SSN":

```bash
./node_modules/.bin/sequelize seed:create --name SSN
vim seeders/20170919194522-SSN.js
```

Next, run the seeds:

```bash
npm run reloadseed # WARNING: aggressively wipes dev db and reload seeds
```

Here's an example of how to create a model from the sometable table on somedb:
```bash
./node_modules/.bin/sequelize-auto -h localhost -p 3306 -u someuser -x somepass -d somedb -e mysql -o ./models -t sometable
```
