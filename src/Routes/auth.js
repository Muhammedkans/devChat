const express = require("express");
const { validateSignUpDate } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const authRouter = express.Router();




authRouter.post("/signup", async (req,res)=>{
  console.log(req.body);
 
 try{
validateSignUpDate(req);

const {firstName, lastName , emailId , password}= req.body;

const passwordHash = await bcrypt.hash(password,10)
  const user = new User({
    firstName,
    lastName,
    emailId,
    password:passwordHash,
  });
   await user.save();
  
  res.send("USER adder successfully")
 }
 catch(err){
  console.log( " eroor happening "+ err.message);
  res.status(500).send("something went wrong " + err.message);
}
})


authRouter.post("/login", async (req, res)=>{

  try{
    const {emailId, password} = req.body;

    const user = await User.findOne({emailId: emailId});

    if(!user){
      throw new Error("Email id not present ")
    }

    const isPasswordValid = await user.validatePassword(password);

    
    if(isPasswordValid){

      const token =  await user.getJWT();

      console.log(token);

      res.cookie("token", token);

      res.send(" Login Succesfly");
    }
    else{
      throw new Error("Passwod id is not Correct ")
    }
  }
  catch(err){
   console.log(err)
  res.status(400).send("something went wrong " + err.message)
  
  }
});

module.exports = authRouter;