import { raw } from "objection";
import User, { UserShape } from "../models/DAO/User";

export const findAllUsers = async (page: number): Promise<object> => await User.query().page(page, 10)