import UserDAO from "../models/DAO/User";

import { raw } from "objection";
import { User } from "../models/Entities/User"

export const createUser = async (user: User): Promise<User> => await UserDAO.query().insert(user)

export const findByMail = async (mail: string): Promise<User> => await UserDAO.query().where('email', mail).first();

export const findAllUsers = async (page: number): Promise<object> => await UserDAO.query().page(page, 10)