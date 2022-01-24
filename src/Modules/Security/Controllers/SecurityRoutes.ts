import express from 'express';
import * as SecurityController from './SecurityController';

export const SecurityRouter = express.Router();

SecurityRouter.post('/security/login', SecurityController.login);
SecurityRouter.post('/security/validate-token', SecurityController.validateToken);