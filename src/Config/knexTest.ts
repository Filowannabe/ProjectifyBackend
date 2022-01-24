import { Knex } from 'knex';
import { knexSnakeCaseMappers } from 'objection'
import dotenv from 'dotenv'

dotenv.config()
interface IKnexConfig {
    [key: string]: Knex.Config;
}

const TestConfig: IKnexConfig = {
    test: {
        client: 'pg',
        connection: {
            connectionString: process.env.DB_NAME_TEST,
            ssl: {
                rejectUnauthorized: false
            }
        },
        pool: { min: 1, max: 2 },
        migrations: {
            tableName: "knex_migrations"
        },
        seeds: {
            directory: "./Seeds"
        },
        ...knexSnakeCaseMappers
    }
}

export default TestConfig