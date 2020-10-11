const jwt = require('jsonwebtoken');
const User = require('../models/User');
const File = require('../models/File');

const authConfig = require('../../config/auth');


class SessionController {
  async store(req, res) {
    
    const { email, password } = req.body;

    const user = await User.findOne({ 
      where: { email },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        }
      ]
    });

    if(!user) {
      return res.status(401).json({error: 'Usuário não encontrado'});
    }

    if(!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Senha errada'});
    }

    const {id, name, portfolio, area, experience, skills, tags, avatar } = user;

    return res.json({
      user: {
        id,
        name,
        email,
        portfolio, 
        area, 
        experience, 
        skills, 
        tags,
        avatar
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    })
  }
}

module.exports = new SessionController();