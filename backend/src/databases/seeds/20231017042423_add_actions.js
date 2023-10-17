/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  return knex('actions').del()
      .then(function () {
        return knex('actions').insert([
          {
            id: 1,
            name: 'Create',
            icon: 'add',
            description: 'Create permission',
            delete: false,
          },
          {
            id: 2,
            name: 'Edit',
            icon: 'edit',
            description: 'Edit permission',
            delete: false,
          },
          {
            id: 3,
            name: 'Delete',
            icon: 'delete',
            description: 'Delete permission',
            delete: false,
          },
          {
            id: 4,
            name: 'Export',
            icon: 'cloud_download',
            description: 'Export permission',
            delete: false,
          },
          {
            id: 5,
            name: 'Import',
            icon: 'cloud_upload',
            description: 'Import permission',
            delete: false,
          },
          {
            id: 6,
            name: 'View',
            icon: 'visibility',
            description: 'View permission',
            delete: false,
          },
          {
            id: 7,
            name: 'Detail',
            icon: 'info',
            description: 'Detail permission',
            delete: false,
          },
        ]);
      });
};
