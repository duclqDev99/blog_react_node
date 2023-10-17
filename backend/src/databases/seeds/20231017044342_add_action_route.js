/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  return knex('route_action').del()
      .then(function () {
        return knex('route_action').insert([
          {
            id_action: 1,
            id_route: 1,
          },
          {
            id_action: 2,
            id_route: 2,
          },
          {
            id_action: 3,
            id_route: 3,
          },
          {
            id_action: 4,
            id_route: 4,
          },
          {
            id_action: 5,
            id_route: 5,
          }
        ]);
      });
};
