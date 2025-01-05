import express from 'express';
import authController from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/register', authController.registration);
authRouter.post('/login', authController.login);
authRouter.get('/activation/:activationLink', authController.activate);

export default authRouter;
