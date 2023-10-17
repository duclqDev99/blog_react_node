const knex = require('knex');
const knexConfig = require('./knex');

// Khởi tạo Knex dựa trên cấu hình
const db = knex(knexConfig.runMigrate);

const migrateDatabase = async () => {
    try {
        await db.migrate.rollback(null, true);
        console.log('Rollback successful.');

        await db.migrate.latest();
        console.log('Migration successful.');

        await db.seed.run();
        console.log('Seeding complete.');
    } catch (error) {
        console.error('Lỗi khi chạy migrate và seeds:', error);
    }
};

migrateDatabase()



