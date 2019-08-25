import Boom from 'boom';

class RootController {
  constructor(database) {
  }

  // [GET] /
  index = async (request, h) => {
    return h.view('root');
  }
}

export default RootController;
