import knex from 'knex';
import devConfig from './knexfile';
import { Model } from 'objection';

export function database() {
    const db = knex(devConfig.development);
    Model.knex(db);
}