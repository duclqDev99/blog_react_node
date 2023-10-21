const express = require('express');
const {checkPermission} = require("../middlewares/checkPermissions");
const routersController = require("../controllers/routersController");
const router = express.Router();


router.get('/',checkPermission({ router: 'routers', action: 'View' }),routersController.getAllRouters);
router.get('/edit',checkPermission({ router: 'routers', action: 'edit' }),routersController.getRouterById);
router.post('/update',checkPermission({ router: 'users', action: 'edit' }),routersController.updated);
// router.post('/created',checkPermission({ router: 'users', action: 'create' }),usersController.created);
// router.delete('/deleted',checkPermission({ router: 'users', action: 'delete' }),usersController.deleted);

module.exports = router;