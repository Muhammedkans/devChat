const express = require("express")

const profileRouter = express.Router();
const{userAuth} = require("../middleware/userAuth");
const { validateEditProfileDate } = require("../utils/validation");



profileRouter.get("/profile/view", userAuth, async (req,res)=>{

  try{
  const user = req.user;

  res.send(user);
  console.log(user);
  }
  catch(err){
    console.log(err);
   res.status(404).send("something went wrong " +err.message);
  }

});

profileRouter.patch("/profile/edit", userAuth, async (req, res)=>{
try{
 if(!validateEditProfileDate(req)){
  throw new Error("invalid edit request");
 }
 const loggedInUser = req.user;
 console.log(loggedInUser); 

 
 Object.keys(req.body).forEach((key)=>{
  return loggedInUser[key] = req.body[key];
 })
 await loggedInUser.save();
 console.log(loggedInUser);
 res.send("updated succefully");
}


catch(err){
  console.log(err)
  res.status(400).send("error happening  check"+ err.message)
}

});

module.exports = profileRouter;