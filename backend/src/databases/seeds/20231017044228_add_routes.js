/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  return knex('routes').del()
      .then(function () {
        return knex('routes').insert([
          {
            id: 1,
            name: 'Users',
            link: '/users',
            parent: null,
            description: 'Trang chính',
            delete: false,
          },
          {
            id: 2,
            name: 'Actions',
            link: '/actions',
            parent: null,
            description: 'Danh sách sản phẩm',
            delete: false,
          },
          {
            id: 3,
            name: 'Routers',
            link: '/routers',
            parent: null,
            description: 'Danh mục điện tử',
            delete: false,
          },
          {
            id: 4,
            name: 'Clothing',
            link: '/products/clothing',
            parent: 2,
            description: 'Danh mục quần áo',
            delete: false,
          },
          {
            id: 5,
            name: 'Contact',
            link: '/contact',
            parent: null,
            description: 'Liên hệ',
            delete: false,
          }
        ]);
      });
};
