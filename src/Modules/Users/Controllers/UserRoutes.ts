import express from 'express';
import * as UserController from './UserController';

export const UserRouter = express.Router();

UserRouter.get('/users', UserController.findAllUsers)
UserRouter.post('/users', UserController.createUser)