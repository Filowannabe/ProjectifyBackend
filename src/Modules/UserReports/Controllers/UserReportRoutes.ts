import express from 'express';
import * as UserReportController from './UserReportController';

export const UserReportRouter = express.Router();

UserReportRouter.get('/user-reports', UserReportController.findAllUserReports)