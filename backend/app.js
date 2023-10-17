const knex = require('knex');
const knexConfig = require('./src/databases/knex');

// Khởi tạo Knex dựa trên cấu hình
const db = knex(knexConfig.development);

// Khi kết nối được thiết lập thành công
db.raw('SELECT 1')
    .then(() => {
        console.log('Kết nối đến cơ sở dữ liệu thành công.');
    })
    .catch((err) => {
        console.error('Lỗi khi kết nối đến cơ sở dữ liệu:', err);
    });


