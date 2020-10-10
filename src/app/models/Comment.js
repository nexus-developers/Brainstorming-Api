import Sequelize, { Model } from 'sequelize';

class Comment extends Model {
  static init(sequelize) {
    super.init({
      content: Sequelize.STRING,
      post_id: Sequelize.INTEGER,
    },{
      sequelize
    });
    return this;
  }
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Post, { foreignKey: 'post_id', as: 'post' });
  }
}

export default Comment;