import { Knex } from 'knex';
import { knexSnakeCaseMappers } from 'objection'
import dotenv from 'dotenv'

dotenv.config()
interface IKnexConfig {
    [key: string]: Knex.Config;
}

const devConfig: IKnexConfig = {
    development: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        },
        pool: { min: 1, max: 2 },
        migrations: {
            tableName: "knex_migrations"
        },
        seeds: {
            directory: "./Seeds"
        },
        ...knexSnakeCaseMappers
    },
    production: {
        client: 'pg',
        connection: {
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            }
        },
        pool: { min: 1, max: 2 },
        migrations: {
            tableName: "knex_migrations"
        },
        seeds: {
            directory: "./seeds"
        },
        ...knexSnakeCaseMappers
    }
}

export default devConfig