import express from 'express';
import * as UserReportController from './UserReportController';
import * as SecurityMiddleware from '../../../Utils/Security/securityMiddleware'

export const UserReportRouter = express.Router();

UserReportRouter.get('/user-reports', SecurityMiddleware.securityMiddleware, UserReportController.findAllUserReports)
UserReportRouter.post('/user-reports', UserReportController.createUserReport)
UserReportRouter.patch('/user-reports/:reportId',  UserReportController.updateUserReport)
UserReportRouter.get('/user-reports/user/:userId',  UserReportController.findAllReportsByUserId)