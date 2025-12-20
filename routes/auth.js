const express= require('express');
const router = express.Router()
const authController = require('../controllers/authController');

Router.post('/', authController.HandleUserLogin);

module.exports = router;