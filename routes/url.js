const express=require('express')
const {handleShortUrl,handleAnalytic} =require('../controller/url')

const router=express.Router();

//router
router.post("/",handleShortUrl);
router.get("/analytic/:shortId",handleAnalytic);


module.exports=router;