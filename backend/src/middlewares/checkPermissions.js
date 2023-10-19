const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/auth.config');

const checkPermission = (permissionInfo) => {
    return async (req, res, next) => {
        try {
            const {permissions}= req.user;
            const { router, action } = permissionInfo;
            const foundRouter = permissions.find(item => item.routerName.toLowerCase() === router.toLowerCase());
            if (foundRouter) {
                let actions = JSON.parse(foundRouter.actionName);
                actions = actions.map(item => item.toLowerCase());
                if (Array.isArray(actions) && actions.includes(action.toLowerCase())) next();
                else return res.status(403).json({ error: 'Không có quyền truy cập' });
            }else return res.status(403).json({ error: 'Không có quyền truy cập' });
        } catch (error) {
            console.log('error:', error);
        }
    };
};

module.exports = { checkPermission };