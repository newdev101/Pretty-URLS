const {validateToken} = require('../services/authentication');

const checkForAuthCookie = (req,res,next)=>{
     const tokenCookieValue = req.cookies['token'];
     if(!tokenCookieValue)console.log("token is not present");
     else{
          try {
             const payload=validateToken(tokenCookieValue);
             req.user = payload;
             console.log(req.user);
             console.log("user varified");
          } catch (error) {
              console.log("user not verified");
          }
     }
     return next();
}

module.exports={
     checkForAuthCookie,
}