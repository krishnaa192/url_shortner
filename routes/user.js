const express = require("express");
const { handleuserSignup,handleLogin } = require("../controller/user");

const router = express.Router();

router.post("/", handleuserSignup);
router.post("/login",handleLogin);

module.exports=router;