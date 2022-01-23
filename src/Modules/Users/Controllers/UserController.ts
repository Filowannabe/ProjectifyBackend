import { Request, Response, NextFunction } from 'express';
import { logger } from '../../../Utils/Logger';

import * as UserService from '../Services/UserService';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body } = req;       
        const response = await UserService.createUser(body);
        res.send(response);

    } catch (error: any) {
        const status = error.status || 500;
        logger.error(`Error in userController.createUser: ${error.message}`);
        res.status(status).send({ 'status': error.status, 'message': error.message }).end();
        return next(error)
    }
}

export const findAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { query } = req;       
        const response = await UserService.findAllUsers(Number(query.page));
        res.send(response);

    } catch (error: any) {
        const status = error.status || 500;
        logger.error(`Error in userController.findAllUsers: ${error.message}`);
        res.status(status).send({ 'status': error.status, 'message': error.message }).end();
        return next(error)
    }
}