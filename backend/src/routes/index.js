const express = require('express');
const router = express.Router();

const usersRoutes = require('./usersRoutes');
const authenticateRoutes = require('./authenticateRoutes');
const {verifyToken} = require('../middlewares/verifyToken');


router.use('/users', verifyToken,usersRoutes);
router.use('/auth',authenticateRoutes);

module.exports = router;