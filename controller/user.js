const { v4: uuidv4 } = require('uuid');
const {setUser} =require('../utils/auth')

const User = require("../models/users");


async function handleuserSignup(req,res){
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });

    return res.redirect('/')
  } catch (error) {
    return res.render('signup')
  }
  
}


async function handleLogin(req,res){
  const { email, password } = req.body;

  const user= await User.findOne({email,password});
  if (!user) {
    return res.render('login',{
      error:"Invalid email or password"
    })
  }
  
 const token= setUser(user);
  res.cookie('uid',token);
  return res.redirect('/')
}


module.exports={
    handleuserSignup,handleLogin
}