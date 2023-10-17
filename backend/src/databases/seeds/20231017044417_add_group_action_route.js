/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  return knex('group_route_action').del()
      .then(function () {
        return knex('group_route_action').insert([
          {
            id_group: 1,
            id_route_action: 1,
          },
          {
            id_group: 2,
            id_route_action: 2,
          },
          {
            id_group: 3,
            id_route_action: 3,
          },
          {
            id_group: 4,
            id_route_action: 4,
          },
          {
            id_group: 5,
            id_route_action: 5,
          }
        ]);
      });
};
