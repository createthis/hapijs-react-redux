import RootController from '~/controllers/root';

exports.plugin = {
  register: (server, options) => {
    const rootController = new RootController(options.database);

    // Declare routes
    server.route([
      {
        method: 'GET',
        path: '/',
        options: {
          handler: rootController.index,
        }
      },
    ]);
  },
  name: 'routes-root',
  version: '1.0.0'
}
