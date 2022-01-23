import { raw } from "objection";
import Project, { ProjectShape } from "../models/DAO/Project";

export const findAllUsers = async (page: number): Promise<object> => await Project.query().page(page, 10)