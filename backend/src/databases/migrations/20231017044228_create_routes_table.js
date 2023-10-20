/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('routes', function (table) {
        table.increments();
        table.string('name').notNullable();
        table.string('link');
        table.integer('parent').unsigned().nullable();
        table.text('description');
        table.boolean('delete');
        table.string('created_by').nullable();
        table.string('updated_by').nullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());

        table.foreign('parent').references('id').inTable('routes');
    });
}
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('routes');
};
