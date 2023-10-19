const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authModels = require('../databases/models/authModels');

const { secretKey } = require('../config/auth.config');

const login= async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authModels.getUserByEmail(email);

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ error: 'Tên người dùng hoặc mật khẩu không đúng' });
        }

        const permission = await authModels.getPermission(user.id);

        const token = jwt.sign({ userId: user.id, username : user.name, permissions: permission }, secretKey, { expiresIn: '1h' });

        res.json({
            messenge : 'đăng nhập thành công!',
            data: token,
            permission : permission,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Lỗi khi đăng nhập' });
    }
}

module.exports = {
    login,
}