import * as UserReportRepository from '../Repositories/UserReportRepository';
import * as UserRepository from '../../Users/Repositories/UserRepository';
import * as ProjectRepository from '../../Projects/Repositories/ProjectRepository';

import { UserReportResponse } from '../models/Responses/UserReportResponse';
import { UserReport } from "../models/Entities/UserReport"
import { BusinessError, NotFoundError } from "../../../Utils/ErrorHandlerMiddleware";
import { DateTime } from "luxon";

export const createUserReport = async (userReport: UserReport): Promise<UserReportResponse> => {

    const userToFind = await UserRepository.findById(userReport.user_id)
    if (!userToFind) throw new NotFoundError('User was not founded');

    const projectToFind = await ProjectRepository.findById(userReport.project_id)
    if (!projectToFind) throw new NotFoundError('Project was not founded');

    const weekNumber: any = DateTime.now().weekNumber

    const reportToFind = await UserReportRepository.findByWeekNumberAndIds(weekNumber, userReport.user_id, userReport.project_id)

    if (reportToFind) throw new BusinessError('Report already exist on this week');

    const newReport: UserReport = {
        user_id: userReport.user_id,
        project_id: userReport.project_id,
        week_number: weekNumber,
        dedication_percentage: userReport.dedication_percentage

    }
    return await UserReportRepository.createUserReport(newReport)
}

export const updateUserReport = async (reportId: number, newPercentage: number) => {

    const reportToFind = await UserReportRepository.findById(reportId)

    if (!reportToFind) throw new NotFoundError('Report was not founded');

    const currentMonth: any = DateTime.now().month
    const reportCreationMonth = DateTime.fromJSDate(new Date(reportToFind.created_at ? reportToFind.created_at : '')).month

    if (currentMonth !== reportCreationMonth) throw new BusinessError('Updatable date is now expired');

    const userToUpdate: UserReport = {
        ...reportToFind,
        dedication_percentage: newPercentage,
    }

    await UserReportRepository.updatePercentage(reportId, userToUpdate)
}

export const findAllReportsByUserId = async (userId: number, page: number): Promise<object> => {
    const validPage = page || page >= 0 ? page : 0;
    return await UserReportRepository.findAllReportsByUserId(userId, validPage)
}

export const findAllUserReports = async (page: number): Promise<object> => {

    const validPage = page || page >= 0 ? page : 0;

    return await UserReportRepository.findAllUserReports(validPage)
}