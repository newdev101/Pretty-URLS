const {Router} = require('express');
const User = require('../models/user');

const router = Router();


router.get('/signin',(req,res)=>{
     return res.render('signin')
})
router.get('/signup',(req,res)=>{
     return res.render('signup');
})

router.get('/logout',(req,res)=>{
     return res.clearCookie('token').redirect('/');
})

//post route for signup
router.post('/signup',async (req,res)=>{
     const { fullName, email, password} = req.body;
     await User.create({
          fullName,
          email,
          password,
     });

     return res.redirect('/user/signin');
})


//post route for signin
router.post('/signin',async (req,res)=>{
     const { email, password} = req.body;

     try {
          const token = await User.matchPasswordAndGenerateToken(email, password);

          console.log(token);
          return res.cookie("token",token).redirect('/');
     } catch (error) {
          res.render('signin',{
               error:"incorrect email or password",
          })
     }
    
})

module.exports = router;