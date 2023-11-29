const URL = require("../models/url");




// get('/')
async function handleStaticHome(req, res) {
  if(!req.user) return res.render('home');
  else{
    const urls = await URL.find({createdBy:req.user._id});
    var url_list=true;
    if(urls.length==0)url_list=false;

    console.log("static controller");
    console.log(typeof(urls),url_list);
    return res.render("home", {
      user:req.user,
      urls: urls,
      url_list
    });
  }
}



module.exports={
     handleStaticHome,
};