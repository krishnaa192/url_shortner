const express = require("express");
const path=require('path');
const {Userauth,Checkauth} =require('./middleware/auth');
//connect.js file to link with mongodb
const { connectTOMongoDB } = require('./connect');
//import url
URL = require('./models/url')
//router
const cookieParser = require("cookie-parser");
const urlrouter = require('./routes/url');
const userrouter=require('./routes/user')
const staticRoute = require('./routes/static');
const app = express(); //  You need to invoke express to create an app instance
const PORT = 8001;
//midddleware to get content from body of postman
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.listen(PORT, () => console.log(`Listening on port ${PORT}`)); // Corrected: `${PORT}` instead of `{port}`

//routing for router/url.js
app.use("/url",Userauth, urlrouter);
app.use("/user",userrouter);
app.use('',Checkauth, staticRoute);


//redirect short url
app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const ftch = await URL.findOneAndUpdate({
        shortId,
    }, {
        $push: {
            visit: { timestamp: Date.now() }
        },
    })
    if (ftch && ftch.urlredirect) {
        res.redirect(ftch.urlredirect);
    } else {
        // If ftch is null or ftch.urlredirect is not available
        res.status(404).send('Not Found');
    }

});



app.set('view engine','ejs')
app.set('views',path.resolve("./views"))
//mongo connection setup
connectTOMongoDB("mongodb://127.0.0.1:27017/urlshort") // Corrected: Removed the '-' in the database name
    .then(() => console.log("Mongo connected"))
    .catch(error => console.error("Mongo connection error:", error));
   