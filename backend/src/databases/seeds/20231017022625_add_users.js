const bcrypt = require('bcrypt');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  return knex('users').del()
      .then(async function() {
        const hashedPassword = await bcrypt.hash('123', 10);

        return knex('users').insert([
          {
            name: 'John Doe',
            phone_number: '1234567890',
            address: '123 Main St',
            email: 'user@gmail.com',
            password: hashedPassword,
            delete: false,
            id_group: 1
          },
          {
            name: 'Jane Smith',
            phone_number: '9876543210',
            address: '456 Elm St',
            email: 'admin@gmail.com',
            password: hashedPassword,
            delete: false,
            id_group: 1
          },
        ]);
      });
};
