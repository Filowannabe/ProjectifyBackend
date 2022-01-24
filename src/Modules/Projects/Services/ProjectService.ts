import * as UserRepository from '../Repositories/ProjectRepository';

import { Project } from "../models/Entities/Project";

import { BusinessError } from "../../../Utils/ErrorHandlerMiddleware";



export const createProject = async (project: Project): Promise<Project> => {

    const projectToFind = await UserRepository.findByName(project.name)

    if (projectToFind) throw new BusinessError('Project already exist')

    return await UserRepository.createProject(project)
}

export const findAllProjects = async (page: number): Promise<object> => {

    const validPage = page || page >= 0 ? page : 0;

    return await UserRepository.findAllProjects(validPage)
}