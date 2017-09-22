'use strict';

const Hapi = require('hapi');
const Hoek = require('hoek');
const Path = require('path');
const Inert = require('inert');
const Vision = require('vision');
const Models = require('./models');
const WebpackPlugin = require('hapi-webpack-plugin');

Models.sequelize.sync();

// Create a server with a host and port
const server = new Hapi.Server({ debug: { request: ['error'] } });
server.connection({
  host: 'localhost',
  port: process.env.port ? process.env.port : 8000
});

server.register(Inert, () => {});
server.route({
  method: 'GET',
  path: '/node_modules/{param*}',
  handler: {
    directory: {
      path: './node_modules',
      redirectToSlash: true,
      index: true
    }
  }
});

server.register({
  register: WebpackPlugin,
  options: './webpack.config.js'
});

// Add routes
var plugins = [
  Vision,
  {
    register: require('./routes/home.js'),
    options: {
      database: Models
    }
  }
];

server.register(plugins, (err) => {

  Hoek.assert(!err, err);

  server.views({
    engines: {
      html: require('handlebars')
    },
    relativeTo: __dirname,
    path: './views',
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {

      reply.view('home', { title: 'Home Page' });
    }
  });

  server.route({
    method: 'GET',
    path:'/hello', 
    handler: function (request, reply) {

      return reply('hello world');
    }
  });

  // Start the server
  server.start((err) => {

    if (err) {
      throw err;
    }
    console.log('Server running at:', server.info.uri);
  });
});

