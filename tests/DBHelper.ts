import config from "../src/Config/knexTest";
import knex from 'knex';

export const db = knex(config.test);

export const clearAll = async () => {
    await db("user_reports").del();
    await db("users").del();
    await db("projects").del();
}