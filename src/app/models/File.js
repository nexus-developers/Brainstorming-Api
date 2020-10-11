const Sequelize = require('sequelize');

class File extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
      name: Sequelize.STRING,
      path: Sequelize.STRING,
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `https://brainstorming-nexus.herokuapp.com/files/${this.path}`;
        },
      }
    }, {
      sequelize,
    });
    return this;
  }
}

module.exports = File;