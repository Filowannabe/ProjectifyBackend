import { raw } from "objection";
import UserReport, { UserReportShape } from "../models/DAO/UserReport";

export const findAllUserReports = async (page: number): Promise<object> => await UserReport.query().page(page, 10)