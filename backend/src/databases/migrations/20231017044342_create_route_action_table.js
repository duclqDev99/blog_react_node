/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('route_action', function (table) {
        table.increments();
        table.integer('id_action').unsigned().notNullable();
        table.integer('id_route').unsigned().notNullable();

        table.foreign('id_action').references('id').inTable('actions');
        table.foreign('id_route').references('id').inTable('routes');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('route_action');
};
