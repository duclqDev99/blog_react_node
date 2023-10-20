const express = require('express');
const router = express.Router();

const usersRoutes = require('./usersRoutes');
const actionsRoutes = require('./actionsRoutes');
const authenticateRoutes = require('./authenticateRoutes');
const {verifyToken} = require('../middlewares/verifyToken');

router.use('/auth',authenticateRoutes);
router.use('/users', verifyToken,usersRoutes);
router.use('/actions',verifyToken, actionsRoutes);

module.exports = router;