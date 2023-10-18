const express = require('express');
const router = express.Router();
const knex = require('../../src/databases/knex'); // Import đối tượng Knex
const usersController = require('../controllers/authenticateControllers');

router.post('/login', usersController.login);

module.exports = router;