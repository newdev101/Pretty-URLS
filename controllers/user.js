const User = require('../models/user');


// get controllers
async function handleGetSignin(req,res){
     return res.render('signin')
}
async function handleGetSignup(req,res){
     return res.render('signup');
}
async function handleLogout(req,res){
     return res.clearCookie('token').redirect('/');
}




//post controllers

//signin
async function handlePostSignin(req,res){
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
}



//signup
async function handlePostSignup(req,res){
     const { fullName, email, password} = req.body;
     await User.create({
          fullName,
          email,
          password,
     });

     return res.redirect('/user/signin');
}


module.exports={
     handleGetSignin,
     handleGetSignup,
     handleLogout,
     handlePostSignin,
     handlePostSignup,
}