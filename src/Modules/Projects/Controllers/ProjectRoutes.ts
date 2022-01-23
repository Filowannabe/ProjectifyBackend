import express from 'express';
import * as ProjectController from './ProjectController';

export const ProjectRouter = express.Router();

ProjectRouter.get('/projects', ProjectController.findAllProjects)
ProjectRouter.post('/projects', ProjectController.createProject)