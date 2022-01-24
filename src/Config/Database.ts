import knex from 'knex';
import devConfig from './knexfile';
import testConfig from './knexTest';
import { Model } from 'objection';

export function database() {
    const db = knex(process.env.NODE_ENV === 'test' ? testConfig.test : devConfig.development);
    Model.knex(db);
}