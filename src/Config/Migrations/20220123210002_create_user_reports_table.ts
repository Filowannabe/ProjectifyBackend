import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('user_reports', table => {
        table.increments('id').unique().notNullable().primary();
        table.integer('user_id').references('id').inTable('users');
        table.integer('project_id').references('id').inTable('projects');
        table.specificType('week_number', 'smallint');
        table.specificType('dedication_percentage', 'smallint');
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.raw('DROP TABLE if exists user_reports cascade');
}

