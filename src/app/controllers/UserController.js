import User from '../models/User';
import File from '../models/File';

class UserController {
  async store(req, res) {
    try {
    const userExists = await User.findOne({ where: { email: req.body.email }});

    if(userExists) {
      return res.status(400).json({ error: 'User already exists'});
    }

    const { id, name, email, portfolio, area, experience, skills, tags} = await User.create(req.body);



    return res.json({
      id, 
      name, 
      email, 
      portfolio, 
      area, 
      experience, 
      skills, 
      tags
    });
  
  } catch(error) {
    console.log(error);
  }
}

async index(req, res) {
  const user = await User.findOne({
    where: { id: req.userId },
    attributes: [
      'id', 
      'name', 
      'email',
      'portfolio',
      'area',
      'experience',
      'skills', 
      'avatar_id'],
    include: [{
      model: File,
      as: 'avatar',
      attributes: ['name', 'path', 'url'],
    }],
    
  });

  if(!user) {
    return res.status(401).json({ error: 'Usuário não encontrado'});
  }


  return res.json(user);
}

  async update(req, res) {
  const { email, oldPassword } = req.body;

  const user = await User.findByPk(req.userId);

  if(email !== user.email) {
    const userExists  = await User.findOne({ where: { email } });

    if(userExists) {
      return res.status(400).json({ error: 'Email já cadastrado'});
    }
  }

  if (oldPassword && !(await user.checkPassword(oldPassword))) {
    return res.status(401).json({error: 'Senha antiga errada'});
  }

  if(oldPassword) {
  if(req.body.password !== req.body.confirmPassword) {
    return res.status(401).json({error: 'As senhas não batem'});
  }
  }

  await user.update(req.body);

  const { id, name, portfolio, area, experience, skills, tags, avatar  } = await User.findByPk(req.userId, {
    include: [
      {
        model: File,
        as: 'avatar',
        attributes: ['id', 'path', 'url'], 
      }
    ]
  })

  return res.json({
    id,
    name,
    email,
    portfolio, 
    area, 
    experience, 
    skills, 
    tags,
    avatar
  });
}


}

export default new UserController();