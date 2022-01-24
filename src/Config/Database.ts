import knex from 'knex';
import devConfig from './knexfile';
import testConfig from './knexTest';
import { Model } from 'objection';

export function database() {
    let db: any = {}
    if (process.env.NODE_ENV === 'test') db = knex(testConfig.test);
    else if (process.env.NODE_ENV === 'development') db = knex(devConfig.development);
    else db = knex(devConfig.production);
    Model.knex(db);
}