import { Model, ModelObject } from 'objection';
import User from '../../../Users/models/DAO/User';
import Project from '../../../Projects/models/DAO/Project';


export default class UserReport extends Model {
    id!: number;
    user_id!: number;
    project_id!: number;
    dedication_percentage!: number;

    static get tableName() {
        return 'user_reports';
    }

    static get relationMappings() {
        return {
            users: {
                relation: Model.HasOneRelation,
                modelClass: User,
                join: {
                    from: 'user_reports.user_id',
                    to: 'users.id'
                },
            },
            study_level: {
                relation: Model.HasOneRelation,
                modelClass: Project,
                join: {
                    from: 'user_reports.project_id',
                    to: 'projects.id'
                }
            },
        }
    }
}
export type UserReportShape = ModelObject<UserReport>;