import * as UserReportRepository from '../Repositories/UserReportRepository';

export const findAllUserReports = async (page: number): Promise<object> => {

    const validPage = page || page >= 0 ? page : 0;

    return await UserReportRepository.findAllUserReports(validPage)
}