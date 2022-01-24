import express from 'express';
import * as ProjectController from './ProjectController';
import * as SecurityMiddleware from '../../../Utils/Security/securityMiddleware'

export const ProjectRouter = express.Router();

ProjectRouter.get('/projects', SecurityMiddleware.securityMiddleware, ProjectController.findAllProjects)
ProjectRouter.post('/projects', SecurityMiddleware.securityMiddleware, ProjectController.createProject)