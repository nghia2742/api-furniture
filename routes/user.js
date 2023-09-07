const UserController = require('../app/controllers/userController');
const express = require('express');

const router = express.Router();

router.get('/', UserController.index);

router.post('/', UserController.createUser);

module.exports = router;
