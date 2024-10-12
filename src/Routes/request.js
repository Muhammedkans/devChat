const express = require("express");
const ConnectionRequest = require("../models/connectionRequist");
const requestRouter = express.Router();
const {userAuth} = require("../middleware/userAuth");
const User = require("../models/user");

requestRouter.post( "/request/send/:status/:toUserId" , userAuth, async (req,res)=>{
  
  try{
   const fromUserId = req.user._id;
   const toUserId = req.params.toUserId;
   const status = req.params.status;


  const allowedStatus= ["ignored", "interested"];

  if(!allowedStatus.includes(status)){
    throw new Error("Error happeining dont do it this type of congifuration");
  }

  const existingConnectionRequest = await ConnectionRequest.findOne({
    $or:[
    {  fromUserId,toUserId}, 
    { fromUserId: toUserId, toUserId: fromUserId}
]})

const toUser = await User.findById(toUserId);


if(!toUser){
  throw new Error(" USER NOT FOUND");
}
if(existingConnectionRequest){
   throw new Error("  this youser already exist");
}
   const connectionRequest = new ConnectionRequest ({ 
    fromUserId,
    toUserId,
    status,
   });



  const data = await connectionRequest.save();

  res.json({
    message:  `${req.user.firstName} is ${status}  to ${req.params.toUserId}`,
    data,
  })

 
    }
    catch(err){
      console.log(err)
     res.status(404).send("something went wrong " +err.message);
    }});


module.exports = requestRouter;