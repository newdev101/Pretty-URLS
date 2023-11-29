const {validateToken} = require('../services/authentication');

const checkForUser = (req,res,next)=>{
     const tokenCookieValue = req.cookies['token'];
     if(!tokenCookieValue)console.log("token is not present");
     else{
          try {
             const payload=validateToken(tokenCookieValue);
             req.user = payload;
          //    console.log(req.user);
             console.log("user varified");
          } catch (error) {
              console.log("user not verified");
          }
     }
     return next();
}
const checkForAuthCookie = (req,res,next)=>{
     const tokenCookieValue = req.cookies['token'];
     if(!tokenCookieValue){
          console.log("token is not present");
          return res.redirect('/user/signin');
     }
     else{
          try {
             const payload=validateToken(tokenCookieValue);
             req.user = payload;
          //    console.log(req.user);
             console.log("user varified");
          } catch (error) {
              console.log("user not verified");
              return res.redirect('/user/signin');
          }
     }
     return next();
}


module.exports={
     checkForAuthCookie,
     checkForUser,
}