const Sequelize = require('sequelize');

class Post extends Sequelize.Model {
  static init(sequelize) {
    super.init({
      title: Sequelize.STRING,
      content: Sequelize.STRING,
      tags: Sequelize.STRING,
    },{
      sequelize
    });
    return this;
  }
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}

module.exports = Post;