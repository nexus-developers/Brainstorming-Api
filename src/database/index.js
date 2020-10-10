import Sequelize from 'sequelize';


import databaseConfig from '../config/database';

import User from '../app/models/User';
import Post from '../app/models/Post';
import Comment from '../app/models/Comment';
import File from '../app/models/File';

const connection = new Sequelize(databaseConfig);

User.init(connection);
Post.init(connection);
Comment.init(connection);
File.init(connection);

Post.associate(connection.models);
Comment.associate(connection.models);
User.associate(connection.models);

module.exports = connection;

