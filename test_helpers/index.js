/* eslint-disable import/no-extraneous-dependencies */
import jsdomGlobal from 'jsdom-global'
import Enzyme from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import 'should-enzyme'

import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

/* uncomment to see UnhandledPromiseRejectionWarning stack traces */
/*
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p);
  console.log('reason:', reason);
});
*/

import hapijs_server from '~/server';

Enzyme.configure({ adapter: new Adapter() });

const mock_store = configureMockStore([thunk]);

// The following line allows us to use window.history.pushState() in tests.
// Otherwise we get the error:
// SecurityError: Could not parse url argument "/your_url" to pushState against base
// URL "about:blank".
jsdomGlobal(undefined, { url: 'https://localhost:8000' });

const mock = new MockAdapter(axios);
// eslint-disable-next-line import/no-extraneous-dependencies
const factory_girl = require('factory-girl');

const adapter = new factory_girl.SequelizeAdapter();
const { factory } = factory_girl;
factory.setAdapter(adapter);

const Models = require('~/models');

// clean the factory state - necessary for mocha watch
factory.cleanUp();
factory.factories = [];

// define factories
require('./factories')(factory, Models);

const { server } = hapijs_server;
const server_initialize = hapijs_server.initialize;
let has_initialized_server = false;

const init_server = async () => {
  if (has_initialized_server) return;
  await server_initialize();
  has_initialized_server = true;
}

let skip_db_sync = false;
let skip_server_init = false;

const set_skip_db_sync = (value) => {
  skip_db_sync = value;
}

const set_skip_server_init = (value) => {
  skip_server_init = value;
}

// eslint-disable-next-line arrow-body-style
const flushPromises = () => {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => setImmediate(resolve));
}

// eslint-disable-next-line mocha/no-top-level-hooks
beforeEach(async function () {
  if (this.currentTest.file.includes('test/client/components')
      || this.currentTest.file.includes('test/client/reducers')
      || this.currentTest.file.includes('test/client/actions')) {
    set_skip_server_init(true);
    set_skip_db_sync(true);
  }
  if (!skip_db_sync) {
    factory.resetSeq();
    await Models.sequelize.sync({ force: true });
  }
  if (!skip_server_init) {
    await init_server();
  }
});

// eslint-disable-next-line mocha/no-top-level-hooks
afterEach(() => {
  set_skip_server_init(false);
  set_skip_db_sync(false);
  mock.reset();
});

// eslint-disable-next-line mocha/no-exports
export default {
  factory,
  Models,
  server,
  mock,
  set_skip_db_sync,
  set_skip_server_init,
  flushPromises,
  mock_store,
}
