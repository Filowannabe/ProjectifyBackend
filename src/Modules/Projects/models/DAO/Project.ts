import { Model, ModelObject } from 'objection';

export default class ProjectDAO extends Model {
    id?:number;
    name!: string;       
    description!: string;     

    static get tableName() {
        return 'projects';
    }
}
export type ProjectShape = ModelObject<ProjectDAO>;