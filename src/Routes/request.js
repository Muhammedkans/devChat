const express = require("express");

const requestRouter = express.Router();
const {userAuth} = require("../middleware/userAuth");

requestRouter.post( "/sendRequest", userAuth, async (req,res)=>{
  
  try{
    const user = req.user;
    res.send(user.firstName);
    console.log(user.firstName);
    }
    catch(err){
      console.log(err)
     res.status(404).send("something went wrong " +err.message);
    }})


module.exports =requestRouter;