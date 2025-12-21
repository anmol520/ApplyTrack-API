const express = require('express');
const router = express.Router();
const jobPostingController = require('../controllers/jobPostingController');
const verifyJWT = require('../middlewares/verifyJWT');
const verifyRoles = require('../middlewares/verifyRoles');

 
router.post('/', 
    verifyJWT, 
    verifyRoles('company'), 
    jobPostingController.HandleJobPosting
);

 

module.exports = router;