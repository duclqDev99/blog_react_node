const express = require('express');
const router = express.Router();
const actionsController = require('../controllers/actionsController');
const {checkPermission} = require('../middlewares/checkPermissions');

// router.get('/',checkPermission({ router: 'users', action: 'View' }),usersController.getUsers);
router.get('/',checkPermission({ router: 'actions', action: 'view' }), actionsController.getAllActions);
router.get('/edit',checkPermission({ router: 'actions', action: 'edit' }) ,actionsController.getActionById);
router.post('/update',checkPermission({ router: 'actions', action: 'edit' }) ,actionsController.updated);
router.post('/create',checkPermission({ router: 'actions', action: 'create' }) ,actionsController.created);
router.delete('/deleted',checkPermission({ router: 'actions', action: 'create' }) ,actionsController.deleted);


module.exports = router;
