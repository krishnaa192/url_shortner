const jwt=require('jsonwebtoken');
const secretkey="jhfhkfjhfsdjhjskhkjs"

function setUser(user){
    return jwt.sign({
        _id:user._id,
        email:user.email,
    },secretkey);
}

function getUser(token){
    if (!token)  return null ;
    try{
        return jwt.verify(token,secretkey);
    }
    catch(e){
        return null;
    }
}



module.exports = {setUser,getUser};