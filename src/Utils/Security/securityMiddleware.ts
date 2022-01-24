/* eslint-disable @typescript-eslint/no-var-requires */
import { Request, Response, NextFunction } from 'express';
import { logger } from '../Logger';
import { UnauthorizedError } from "../ErrorHandlerMiddleware";

const jwt = require('jsonwebtoken');

export const securityMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.header('Authorization')

    if (!auth) throw new UnauthorizedError('Permission denied')

    if (!auth.startsWith('Bearer')) {
        if (!auth.startsWith('bearer')) throw new UnauthorizedError('Missing Bearer')
    }
    try {
        const token = auth.split(' ')[1]
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        if (payload) return next()

    } catch (error: any) {
        const status = error.status || 500;
        logger.error(`Error in securityMiddleware.login: ${error.message}`);
        res.status(status).send({ 'status': error.status, 'message': 'Permission denied' }).end();
        return next(error)
    }
}