/* eslint-disable @typescript-eslint/no-var-requires */
import * as UserRepository from '../../Users/Repositories/UserRepository';

import { UnauthorizedError } from "../../../Utils/ErrorHandlerMiddleware";
import { comparePassword } from '../../../Utils/Security/SecurityUtils';
import { UserResponse } from "../../Users/models/Responses/UserResponse"
import { Token } from '../models/Entities/Token';


const jwt = require('jsonwebtoken');

const {
    JWT_SECRET,
    TOKEN_EXPIRATION = '1d',
} = process.env;

export const login = async (email: string, password: string): Promise<Token> => {
    const userToFind = await UserRepository.findByMail(email)

    if (!userToFind) throw new UnauthorizedError('Invalid credentials')

    if (userToFind.inactive) throw new UnauthorizedError('User deactivate')

    if (!await comparePassword(password, userToFind.password)) throw new UnauthorizedError('Invalid credentials');

    const payload: UserResponse = {
        first_name: userToFind.first_name,
        first_lastname: userToFind.first_lastname,
        email: userToFind.email,
        inactive: userToFind.inactive
    }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
    return { "token": token };
}

export const validateToken = async (token: string): Promise<object> => {
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        return await payload;
        
    } catch (error) {
        throw new UnauthorizedError('Invalid token');
    }
};