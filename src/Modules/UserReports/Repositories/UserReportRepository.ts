import { raw } from "objection";
import UserReportDAO from "../models/DAO/UserReport";
import { UserReport } from "../models/Entities/UserReport"

export const createUserReport = async (user: UserReport): Promise<UserReport> => await UserReportDAO.query().insert(user)

export const findByWeekNumberAndIds = async (weekNumber: number, user_id: number, project_id: number): Promise<UserReport> => await UserReportDAO.query()
    .where('week_number', weekNumber)
    .where('user_id', user_id)
    .where('project_id', project_id)
    .first();

export const findAllUserReports = async (page: number): Promise<object> => await UserReportDAO.query().page(page, 10)