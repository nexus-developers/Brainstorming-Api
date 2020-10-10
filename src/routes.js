import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import PostController from './app/controllers/PostController';
import CommentController from './app/controllers/CommentController';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.post('/post', authMiddleware, PostController.store);
routes.post('/comment', authMiddleware, CommentController.store);
routes.get('/comment', authMiddleware, CommentController.index);
routes.put('/users', authMiddleware ,UserController.update);
routes.get('/users', authMiddleware, UserController.index);
routes.get('/post', authMiddleware, PostController.index);
routes.get('/post/:id', authMiddleware, PostController.findOne);
routes.get('/post-findAll', PostController.findAll);
routes.put('/post/:id', authMiddleware, PostController.update);

routes.post('/files', authMiddleware, upload.single('file'), FileController.store)


export default routes;