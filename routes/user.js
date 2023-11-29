const {Router} = require('express');
const router = Router();
const { handleGetSignin, handleGetSignup, handleLogout, handlePostSignin, handlePostSignup} = require('../controllers/user');



//get routes
router.get('/signin',handleGetSignin);

router.get('/signup',handleGetSignup);

router.get('/logout',handleLogout);




//post route for signup
router.post('/signup',handlePostSignup);

//post route for signin
router.post('/signin',handlePostSignin);

module.exports = router;