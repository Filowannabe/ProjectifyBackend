import ProjectDAO from "../models/DAO/Project";

import { raw } from "objection";
import { Project } from "../models/Entities/Project";


export const createProject = async (project: Project): Promise<Project> => await ProjectDAO.query().insert(project)

export const findByName = async (name: string): Promise<Project> => await ProjectDAO.query().where('name', name).first();

export const findAllProjects = async (page: number): Promise<object> => await ProjectDAO.query().page(page, 10)