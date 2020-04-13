import express from 'express';

//daos
import { userDao } from '../databaseStorage/daos';

export const authRouter = express.Router();
import { AuthController } from '../controllers/auth';
const authController = new AuthController(userDao);

authRouter.post('/register', authController.createUser);
authRouter.post('/login', authController.loginUser);
