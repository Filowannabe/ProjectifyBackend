import { Request, Response, NextFunction } from 'express';
import { logger } from '../../../Utils/Logger';

import * as ProjectService from '../Services/ProjectService';

export const findAllProjects = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { query } = req;       
        const response = await ProjectService.findAllProjects(Number(query.page));
        res.send(response);

    } catch (error: any) {
        const status = error.status || 500;
        logger.error(`Error in userController.findAllUsers: ${error.message}`);
        res.status(status).send({ 'status': error.status, 'message': error.message }).end();
        return next(error)
    }
}