import express from 'express';
import userController from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.get('/:userId', userController.getUserBy);
userRouter.post('/avatar/:userId', userController.updateUserAvatar);
userRouter.post('/password/:userId', userController.updateUserPassword);
userRouter.delete('/:userId', userController.deleteUser);

export default userRouter;
