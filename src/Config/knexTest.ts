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
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME_TEST,
        },
        pool: { min: 1, max: 2 },
        migrations: {
            directory: './Migrations',
            tableName: "knex_migrations"
        },
        seeds: {
            directory: "./Seeds"
        },
        ...knexSnakeCaseMappers
    }
}

export default TestConfig