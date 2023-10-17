/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('group_route_action', function (table) {
        table.increments();
        table.integer('id_group').unsigned().notNullable();
        table.integer('id_route_action').unsigned().notNullable();

        table.foreign('id_group').references('id').inTable('groups');
        table.foreign('id_route_action').references('id').inTable('route_action');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('group_route_action');
};
