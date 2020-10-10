import Sequelize from 'sequelize';


import databaseConfig from '../config/database';

import User from '../app/models/User';

const connection = new Sequelize(databaseConfig);

User.init(connection);

module.exports = connection;

