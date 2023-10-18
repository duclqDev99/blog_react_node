const knex = require('knex');
const knexConfig = require('./src/databases/knex');
require('dotenv').config();
const express = require('express');
const app = express();
// Khởi tạo Knex dựa trên cấu hình
const db = knex(knexConfig.development);
const routes = require('./src/routes/index');
// Khi kết nối được thiết lập thành công
db.raw('SELECT 1')
    .then(() => {
        console.log('Kết nối đến cơ sở dữ liệu thành công.');
    })
    .catch((err) => {
        console.error('Lỗi khi kết nối đến cơ sở dữ liệu:', err);
    });
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use('/api', routes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

