import { Model, ModelObject } from 'objection';

export default class User extends Model {
    id?:number;
    first_name!: string;       
    second_name!: string;     
    first_lastname!: string;  
    second_lastname!: string;   
    email!: string;
    password!: string;
    inactive!: boolean;

    static get tableName() {
        return 'users';
    }
}
export type UserShape = ModelObject<User>;