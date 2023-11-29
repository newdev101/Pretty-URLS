const express = require('express');

const {handleGenerateNewURL, handleGetAnalytics} = require('../controllers/url');

const router = express.Router();


router.post('/',handleGenerateNewURL);
router.get('/',handleGetAnalytics);


module.exports=router;