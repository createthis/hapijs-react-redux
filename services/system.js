import Sequelize from 'sequelize';

class SystemService {
  constructor(database) {
    this.database = database;
    this.Sequelize = this.database.sequelize;
  }

  static get_port(node_env) {
    if (!node_env) node_env = process.env.NODE_ENV;
    if (process.env.port) {
      return process.env.port;
    }
    if (node_env === 'test') {
      return '0'; // use OS to determine a free random port
    }
    return '8000';
  }

  static get_node_env() {
    return process.env.NODE_ENV || 'development';
  }
}

export default SystemService;
