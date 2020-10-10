import Post from '../models/Post';
import User from '../models/User';

class PostController {
  async store(req, res) {
    try {
  
    const { title, content, tags } = req.body;

    const post = await Post.create({
      user_id: req.userId,
      title,
      content,
      tags,
    })

    return res.json(post);
  } catch(err) {
    console.log(err);
  }
  }

  async index(req, res) {
    const post = await Post.findAll({
      where: { user_id: req.userId}
    });
  
    if(!post) {
      return res.status(401).json({ error: 'Não encontramos Posts desse usuário'});
    }
   
    return res.json(post);
  }

  async findOne(req, res) {
    const { id } = req.params;

    const user = await User.findByPk(req.userId);

    const post = await Post.findOne({
      where: { id: id}
    })

    if(!post) {
      return res.status(401).json({ error: 'Não encontramos Posts desse usuário'});
    }

    if(post.user_id == user.id) {
    
      await post.update(req.body);
    
    } else {
      return res.status(400).json({error: 'Esse post não é seu'});
    }

    return res.json(post);
  }

  async findAll(req, res) {
    const posts = await Post.findAll();

    return res.json(posts);
  }

  async update(req, res) {
    const { id } = req.params;

    const { content } = req.body;

    const post = await Post.findByPk(id);

    const user = await User.findByPk(req.userId);
    

    if(!user) {
      return res.status(400).json({error: 'User not found'});
    }

    if(!post) {
      return res.status(400).json({error: 'Post not found'});
    }
    
    if(post.user_id == user.id) {
    
      await post.update(req.body);
    
    } else {
      return res.status(400).json({error: 'Esse post não é seu'});
    }
  
    return res.json({
      id,
      content,
    });
  }
}

export default new PostController();