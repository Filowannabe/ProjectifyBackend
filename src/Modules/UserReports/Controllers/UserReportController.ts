import { Request, Response, NextFunction } from 'express';
import { logger } from '../../../Utils/Logger';

import * as UserReportService from '../Services/UserReportService';

export const createUserReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body } = req;
        const response = await UserReportService.createUserReport(body);
        res.send(response);

    } catch (error: any) {
        const status = error.status || 500;
        logger.error(`Error in userReportController.createUserReport: ${error.message}`);
        res.status(status).send({ 'status': error.status, 'message': error.message }).end();
        return next(error)
    }
}

export const updateUserReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body, params } = req;
        const response = await UserReportService.updateUserReport(Number(params.reportId), body.newPercentage);
        res.send(response);

    } catch (error: any) {
        const status = error.status || 500;
        logger.error(`Error in userReportController.createUserReport: ${error.message}`);
        res.status(status).send({ 'status': error.status, 'message': error.message }).end();
        return next(error)
    }
}

export const findAllReportsByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { query, params } = req;
        const response = await UserReportService.findAllReportsByUserId(Number(params.userId),Number(query.page));
        res.send(response);

    } catch (error: any) {
        const status = error.status || 500;
        logger.error(`Error in userReportController.findAllUserReports: ${error.message}`);
        res.status(status).send({ 'status': error.status, 'message': error.message }).end();
        return next(error)
    }
}

export const findAllUserReports = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { query } = req;
        const response = await UserReportService.findAllUserReports(Number(query.page));
        res.send(response);

    } catch (error: any) {
        const status = error.status || 500;
        logger.error(`Error in userReportController.findAllUserReports: ${error.message}`);
        res.status(status).send({ 'status': error.status, 'message': error.message }).end();
        return next(error)
    }
}