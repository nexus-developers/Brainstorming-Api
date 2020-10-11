const Comment = require('../models/Comment');
const User = require('../models/User');

class CommentController {
  async store(req, res) {
    try {
  
    const { content, post_id } = req.body;

    const comment = await Comment.create({
      user_id: req.userId,
      post_id,
      content,
    })

    return res.json(comment);
  } catch(err) {
    console.log(err);
  }
  }

  async index(req, res) {
    const comment = await Comment.findAll({
      where: { user_id: req.userId}
    });
  
    if(!comment) {
      return res.status(401).json({ error: 'Não encontramos comentários desse usuário'});
    }
   
    return res.json(comment);
  }

  async getComments(req, res) {
    const { id } = req.params;

    const comment = await Comment.findAll({
      where: { post_id: id },
      include: [{
        model: User,
        as: 'user',
        attributes: ['name'],
      }],
    })

    if(!comment) {
      return res.status(401).json({ error: 'Não encontramos comentários desse usuário'});
    }
    
      return res.json(comment);

  }

}

module.exports = new CommentController();