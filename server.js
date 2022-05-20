// eslint-disable-next-line import/no-import-module-exports
import '@babel/register';
// eslint-disable-next-line import/no-import-module-exports
import SystemService from '~/services/system'

const NODE_ENV = SystemService.get_node_env();
if (NODE_ENV !== 'test') {
  require('dotenv').config();
}

const ENABLE_HMR = (NODE_ENV === 'development') && !process.env.DISABLE_HMR;
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const Models = require('~/models');
const AuthBearer = require('hapi-auth-bearer-token');
const AuthCookie = require('@hapi/cookie');
const AuthBasic = require('@hapi/basic');
const WebpackPlugin = require('hapi-webpack-plugin-2').default;
// Create a server with a host and port
const server = new Hapi.Server({
  host: process.env.host ? process.env.host : 'localhost',
  port: SystemService.get_port(),
  router: { stripTrailingSlash: true },
  debug: { request: ['info'] },
});
server.validator(require('joi'));

const register_strategies = async () => {
  const cache = server.cache({ segment: 'sessions', expiresIn: 3 * 24 * 60 * 60 * 1000 });

  server.app.cache = cache;
}

const register_routes = async (err) => {
  await server.register(Inert);
  const public_path = ENABLE_HMR ? './public' : './dist/public'; // EV-2105
  server.route({
    method: 'GET',
    path: '/public/{param*}',
    options: {
      handler: {
        directory: {
          path: public_path,
          redirectToSlash: true,
          index: true,
        },
      },
    },
  });
  server.route({
    method: 'GET',
    path: '/node_modules/{param*}',
    options: {
      handler: {
        directory: {
          path: './node_modules',
          redirectToSlash: true,
          index: true,
        },
      },
    },
  });

  if (!module.parent) {
    // do not use webpack inside mocha / npm test
    if (ENABLE_HMR) {
      // Only allow Webpack HMR in development environments. EV-2105
      await server.register({
        plugin: WebpackPlugin,
        options: {
          configPath: './webpack.config.js',
        },
      });
    }
    await server.register({
      plugin: require('@hapi/good'),
      options: {
        includes: {
          request: ['headers', 'payload'],
          response: ['payload'],
        },
        reporters: {
          console: [
            {
              module: '@hapi/good-squeeze',
              name: 'Squeeze',
              args: [{
                error: '*', log: '*', request: '*', response: '*',
              }],
            },
            {
              module: '@hapi/good-console',
              args: [{ color: (NODE_ENV === 'development') }],
            },
            'stdout',
          ],
        },
      },
    });
  }

  // Add routes
  const routes = [
    Vision,
    {
      plugin: require('~/routes/root'),
      options: {
        database: Models,
      },
    },
  ];

  await server.register(routes);

  server.views({
    engines: {
      hbs: require('handlebars'),
    },
    relativeTo: __dirname,
    path: './views',
  });

  if (!module.parent) {
    // Start the server, but only if not running inside mocha / npm test
    // eslint-disable-next-line no-shadow
    server.start(async (err) => {
      if (err) {
        throw err;
      }
      console.log('Server running at:', server.info.uri);
    });
  }
}

const initialize = async () => {
  await server.register([AuthBearer, AuthCookie, AuthBasic]);
  await register_strategies();
  await register_routes();

  console.log('server initialized');
}

const main = async () => {
  await initialize();
}

if (!module.parent) {
  // if we're not running inside mocha / npm test, auto initialize the server.
  // inside mocha, we need to do this via a beforeEach in order to assure synchrony.
  main();
}

export default {
  server,
  initialize,
}
process.on('unhandledRejection', (error) => {
  // Will print "unhandledRejection err is not defined"
  console.log('unhandledRejection', error.message);
  console.log(error.stack);
});
/* process.on('warning', error => {
  // Will print "unhandledRejection err is not defined"
  console.log('unhandledRejection', error.message);
  console.log(error.stack);
}); */
