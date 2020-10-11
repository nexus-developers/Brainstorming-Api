const { Router } = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');
const PostController = require('./app/controllers/PostController');
const CommentController = require('./app/controllers/CommentController');
const FileController = require('./app/controllers/FileController');

const authMiddleware = require('./app/middlewares/auth');

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.post('/post', authMiddleware, PostController.store);
routes.post('/comment', authMiddleware, CommentController.store);
routes.get('/comment', authMiddleware, CommentController.index);
routes.get('/comment/:id', authMiddleware, CommentController.getComments);
routes.put('/users', authMiddleware ,UserController.update);
routes.get('/users', authMiddleware, UserController.index);
routes.get('/users/:id', UserController.getById);
routes.get('/post', authMiddleware, PostController.index);
routes.get('/post/:id', authMiddleware, PostController.findOne);
routes.get('/post-findAll', PostController.findAll);
routes.put('/post/:id', authMiddleware, PostController.update);

routes.post('/files', authMiddleware, upload.single('file'), FileController.store)


module.exports = routes;