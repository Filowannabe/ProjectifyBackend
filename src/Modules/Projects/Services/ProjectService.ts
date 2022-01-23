import * as UserRepository from '../Repositories/ProjectRepository';

export const findAllProjects = async (page: number): Promise<object> => {

    const validPage = page || page >= 0 ? page : 0;

    return await UserRepository.findAllUsers(validPage)
}