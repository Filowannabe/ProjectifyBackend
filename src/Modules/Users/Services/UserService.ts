import * as UserRepository from '../Repositories/UserRepository';
import * as EmailValidator from 'email-validator';

import { User } from "../models/Entities/User"

import { BusinessError, NotFoundError, UnauthorizedError } from "../../../Utils/ErrorHandlerMiddleware";
import { hashSomePassowrd } from '../../../Utils/Security/SecurityUtils';




export const createUser = async (user: User): Promise<User> => {

    const userToFind = await UserRepository.findByMail(user.email)

    if (userToFind) throw new BusinessError('User already exist')
    if (!EmailValidator.validate(user.email)) throw new BusinessError('Email is not valid.');

    user.password = await hashSomePassowrd(user.password)
    const repositoryRequest: User = await UserRepository.createUser(user)

    const createdUser: any = {
        first_name: repositoryRequest.first_name,
        first_lastname: repositoryRequest.first_lastname,
        email: repositoryRequest.email,
        inactive: repositoryRequest.inactive

    }
    return createdUser
}

export const findAllUsers = async (page: number): Promise<object> => {
    const validPage = page || page >= 0 ? page : 0;
    return await UserRepository.findAllUsers(validPage)
}