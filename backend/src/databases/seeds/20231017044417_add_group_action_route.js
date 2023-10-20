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
            id_group: 1,
            id_route_action: 2,
          },
          {
            id_group: 1,
            id_route_action: 3,
          },
          {
            id_group: 1,
            id_route_action: 4,
          },
          {
            id_group: 1,
            id_route_action: 5,
          },
          {
            id_group: 1,
            id_route_action: 6,
          },
          {
            id_group: 1,
            id_route_action: 7,
          },
          {
            id_group: 1,
            id_route_action: 8,
          },
          {
            id_group: 1,
            id_route_action: 9,
          },
          {
            id_group: 1,
            id_route_action: 10,
          },
          {
            id_group: 1,
            id_route_action: 11,
          },
          {
            id_group: 1,
            id_route_action: 12,
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
