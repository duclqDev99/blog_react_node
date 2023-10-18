const express = require('express');
const router = express.Router();
const knex = require('../../src/databases/knex'); // Import đối tượng Knex
const usersController = require('../controllers/usersControllers');
const {checkPermission} = require('../middlewares/checkPermissions');

router.get('/',checkPermission({ router: 'users', action: 'View' }),usersController.getUsers);

module.exports = router;