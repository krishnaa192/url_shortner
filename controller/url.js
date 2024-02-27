const shortid = require('shortid')
const URL = require('../models/url')



async function handleShortUrl(req, res) {
    const body = req.body;
    if (!req.body || !req.body.url) {
        return res.status(400).json({ error: 'url is needed' });
    }
    const shortId = shortid();
   
    await URL.create(
        {
            shortId: shortId,
            urlredirect: body.url,
            visit: [],
            createdBy: req.user._id
        }
    )
    return res.render("home", {
        id: shortId,
      });
}

async  function handleAnalytic(req,res){
    const shortId = req.params.shortId;
    const analytics= await URL.findOne({shortId});
    return res.json({totalclick:analytics.visit.length,analysis:analytics.visit})
}


module.exports = {
    handleShortUrl,handleAnalytic
}