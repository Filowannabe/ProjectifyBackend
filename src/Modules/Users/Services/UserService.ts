import * as UserRepository from '../Repositories/UserRepository';
import * as EmailValidator from 'email-validator';

import { User } from "../models/Entities/User"
import { UserResponse } from "../models/Responses/UserResponse"

import { BusinessError, NotFoundError, UnauthorizedError } from "../../../Utils/ErrorHandlerMiddleware";
import { hashSomePassowrd } from '../../../Utils/Security/SecurityUtils';



export const createUser = async (user: User): Promise<UserResponse> => {

    const userToFind = await UserRepository.findByMail(user.email)

    if (userToFind) throw new BusinessError('User already exist')
    if (!EmailValidator.validate(user.email)) throw new BusinessError('Email is not valid.');

    user.password = await hashSomePassowrd(user.password)
    const repositoryRequest: User = await UserRepository.createUser(user)

    const createdUser: UserResponse = {
        id: repositoryRequest.id,
        first_name: repositoryRequest.first_name,
        first_lastname: repositoryRequest.first_lastname,
        email: repositoryRequest.email,
        inactive: repositoryRequest.inactive
    }
    return createdUser
}

export const findAllUsers = async (page: number): Promise<UserResponse> => {
    const validPage = page || page >= 0 ? page : 0;
    let repositoryRequest: any = await UserRepository.findAllUsers(validPage)

    repositoryRequest = {
        results: repositoryRequest!!.results.map((it: UserResponse) => {
            return {
                id:it.id,
                first_name: it.first_name,
                first_lastname: it.first_lastname,
                email: it.email,
                inactive: it.inactive
            }
        }),
        total: repositoryRequest.total
    }
    return repositoryRequest

}