const Sequelize = require('sequelize');

const databaseConfig = require('../config/database');

const User = require('../app/models/User');
const Post = require('../app/models/Post');
const Comment = require('../app/models/Comment');
const File = require('../app/models/File');

const connection = new Sequelize(databaseConfig);

User.init(connection);
Post.init(connection);
Comment.init(connection);
File.init(connection);

Post.associate(connection.models);
Comment.associate(connection.models);
User.associate(connection.models);

module.exports = connection;

