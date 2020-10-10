import Comment from '../models/Comment';

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
}

export default new CommentController();