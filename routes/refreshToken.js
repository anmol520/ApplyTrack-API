const express = require('express')
const router = express.Router();
const  refreshtokenController  = require('../controllers/refreshtokenController');

router.get('/',refreshtokenController.HandleRefreshToken);
module.exports = router