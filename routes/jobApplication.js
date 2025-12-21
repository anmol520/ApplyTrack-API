const express = require('express');
const router = express.Router();
const jobApplicationController = require('../controllers/jobApplicationController');
const verifyJWT = require('../middlewares/verifyJWT');
const verifyRoles = require('../middlewares/verifyRoles');

 
router.post('/apply', 
    verifyJWT, 
    verifyRoles('student'), 
    jobApplicationController.HandleUserApplication
);

 

module.exports = router;