const jwt = require("jsonwebtoken");
const User = require("../models/user")

const userAuth = async (req,res,next)=>{

try{
  const cookies = req.cookies;
  
  const {token} =  cookies;

  if(!token){
    throw new Error(" token not found ");
  }

  const decodedobj =  await jwt.verify(token, "DEV@Tinder$790");

  const {_id } = decodedobj;
 
  const user = await User.findById(_id)

 if(!user){
  throw new Error(" user not found");
 }

 req.user = user;
 console.log(req.user)
 next();
 
 }catch(err){
  console.log(err);
  res.status(404).send("error happening "+err.message);

  }
}

module.exports = {
  userAuth,
}