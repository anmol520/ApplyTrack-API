const express= require('express');
const router = express.Router()
const authController = require('../controllers/authController');

router.post('/', authController.HandleUserLogin);

module.exports = router;