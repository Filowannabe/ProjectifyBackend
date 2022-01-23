import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', table => {
        table.increments('id').unique().notNullable().primary();
        table.string('first_name').notNullable();
        table.string('second_name').notNullable();
        table.string('first_lastname').notNullable();
        table.string('second_lastname').notNullable();
        table.string('email', 255).unique().notNullable();
        table.string('password', 255).notNullable();
        table.boolean('inactive').notNullable();
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.raw('DROP TABLE if exists users cascade');
}

