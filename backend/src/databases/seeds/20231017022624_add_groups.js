/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  return knex('groups').del()
      .then(function () {
        return knex('groups').insert([
          {
            id: 1,
            name: 'Admin',
            description: 'Phân quyền quản trị viên',
            delete: false,
          },
          {
            id: 2,
            name: 'Editor',
            description: 'Phân quyền biên tập viên',
            delete: false,
          },
          {
            id: 3,
            name: 'User',
            description: 'Phân quyền người dùng',
            delete: false,
          },
          {
            id: 4,
            name: 'Guest',
            description: 'Phân quyền khách',
            delete: false,
          },
          {
            id: 5,
            name: 'Manager',
            description: 'Phân quyền quản lý',
            delete: false,
          }
        ]);
      });
};
