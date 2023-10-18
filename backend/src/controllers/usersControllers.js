
const usersModels = require('../databases/models/usersModels')

const getUsers = async (req, res) => {
    try {
        const users = await usersModels.getAllUsers();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Lỗi khi lấy danh sách người dùng' });
    }
}

module.exports = {
    getUsers,
}