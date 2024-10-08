const express = require("express")

const profileRouter = express.Router();
const{userAuth} = require("../middleware/userAuth")



profileRouter.get("/profile", userAuth, async (req,res)=>{

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

module.exports = profileRouter;