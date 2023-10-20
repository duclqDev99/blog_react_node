const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersControllers');
const {checkPermission} = require('../middlewares/checkPermissions');

router.get('/',checkPermission({ router: 'users', action: 'View' }),usersController.getUsers);
router.get('/update',checkPermission({ router: 'users', action: 'edit' }),usersController.getUserById);
router.post('/update',checkPermission({ router: 'users', action: 'edit' }),usersController.update);
router.post('/created',checkPermission({ router: 'users', action: 'create' }),usersController.created);
router.delete('/deleted',checkPermission({ router: 'users', action: 'delete' }),usersController.deleted);

module.exports = router;