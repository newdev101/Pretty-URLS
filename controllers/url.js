const URL = require("../models/url");
const ShortUniqueId = require("short-unique-id");
const uid = new ShortUniqueId();

//for generating new url
async function handleGenerateNewURL(req, res) {
  const Body = req.body;
  console.log(Body);

  if (!Body.url) return res.status(400).json({ error: "url is required" });

  //generatin randomid
  const shortID = uid.rnd(8);

  await URL.create({
    shortId: shortID,
    redirectUrl: Body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });
  console.log(`your url is id= ${shortID}`);
  // const urls = await URL.find({});

  const urls = await URL.find({ createdBy: req.user._id });
  var url_list = true;
  if (urls.length == 0) url_list = false;
  //rendered response
  return res.render("home", {
    id: shortID,
    user: req.user,
    urls: urls,
    url_list,
  });
  // req.id=shortID;
  // return res.redirect('/');
}

//for redirecting
// REDIRECT
async function handleRedirectURL(req, res) {
  console.log(`new redirect request =${req.url}`);

  //handling request of favicon.ico
  if (req.url == "/favicon.ico") return res.end();
  const shortId = req.params.id;
  console.log(`redirect req with id = ${shortId}`);

  try {
    const url = await URL.findOneAndUpdate(
      { shortId: shortId },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );
    console.log(url.redirectUrl);

    // Concatenation of http in the url if it doesn't have any protocol
    const redirectUrl =
      url.redirectUrl.startsWith("http://") ||
      url.redirectUrl.startsWith("https://")
        ? url.redirectUrl
        : `http://${url.redirectUrl}`;

    console.log(`you are redirected to ${url.redirectUrl}`);
    return res.redirect(redirectUrl);
  } catch (error) {
    res.render("home", {
      error: "Bad url!!!",
      user:req.user,
    });
  }
}

//for analytics
async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOne({ shortId });
  if (!entry) {
    console.log("status: wrong url");
    return res.status(401).json({ status: "wrong url" });
  }

  console.log(`total clicks =${entry.visitHistory.length}`);
  return res.status(200).json({
    total_clicks: entry.visitHistory.length,
    visitHistory: entry.visitHistory,
  });
}

module.exports = {
  handleGenerateNewURL,
  handleRedirectURL,
  handleGetAnalytics,
};
