const knex = require('knex');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
        table.increments();
        table.string('name');
        table.string('phone_number');
        table.integer('id_group').unsigned().nullable();
        table.string('address');
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.boolean('delete');
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())

        table.foreign('id_group').references('id').inTable('groups');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
