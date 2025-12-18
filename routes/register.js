const express = require('express');
const router = express.Router();
const registerControl = require('../controllers/registercontroller');

router.post('/',registerControl.HandleNewUser);

module.exports = router;