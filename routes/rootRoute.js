const express = require('express');
const {handleRedirectURL} = require('../controllers/url')
const {handleStaticHome} = require('../controllers/static');
const router = express.Router();


router.get('/:id',handleRedirectURL);

router.get('/',handleStaticHome);

module.exports=router;