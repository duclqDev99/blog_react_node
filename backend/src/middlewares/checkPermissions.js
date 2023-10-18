const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/auth.config');

const checkPermission = (permissionInfo) => {
    return async (req, res, next) => {
        try {
            const {userId}= req.user;
            const {permission}= req.body;
            const { router, action } = permissionInfo;
            const permissions = JSON.parse(permission);
            permissions.forEach((value) => {
                if((value.routerName).toLowerCase() === router.toLowerCase()){
                    value.
                    console.log('router ton tại')
                }
                else console.log('không ton tai')
            })
            console.log('router',router)
            console.log('action',action)
            console.log('userId',userId)

            // Kiểm tra quyền dựa trên router và action

            next(); // Gọi next để tiếp tục xử lý middleware tiếp theo hoặc route
        } catch (error) {
            console.log('error:', error);
        }
    };
};

module.exports = { checkPermission };