import { Request, Response, NextFunction } from 'express';
import { logger } from '../../../Utils/Logger';

import * as UserReportService from '../Services/UserReportService';

export const findAllUserReports = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { query } = req;       
        const response = await UserReportService.findAllUserReports(Number(query.page));
        res.send(response);

    } catch (error: any) {
        const status = error.status || 500;
        logger.error(`Error in userController.findAllUsers: ${error.message}`);
        res.status(status).send({ 'status': error.status, 'message': error.message }).end();
        return next(error)
    }
}