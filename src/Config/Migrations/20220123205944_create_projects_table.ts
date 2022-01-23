import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('projects', table => {
        table.increments('id').unique().notNullable().primary();
        table.string('name').notNullable();
        table.specificType('description', 'text');
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.raw('DROP TABLE if exists projects cascade');
}

