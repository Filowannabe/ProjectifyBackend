import express from 'express';
import * as UserController from './UserController';
import * as SecurityMiddleware from '../../../Utils/Security/securityMiddleware'

export const UserRouter = express.Router();

UserRouter.get('/users', SecurityMiddleware.securityMiddleware, UserController.findAllUsers)
UserRouter.post('/users', SecurityMiddleware.securityMiddleware, UserController.createUser)