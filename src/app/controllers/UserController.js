import User from '../models/User';

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
    where: { id: req.userId}
  });

  if(!user) {
    return res.status(401).json({ error: 'Usuário não encontrado'});
  }

  const {id, name, email, portfolio, area, experience, skills, tags } = user;

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

  const { id, name, portfolio, area, experience, skills, tags  } = await user.update(req.body);

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
}


}

export default new UserController();