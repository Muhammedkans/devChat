const express = require('express');
const connectDB = require('./config/database');
const app = express();
const User = require("./models/user");
const cookieParser = require("cookie-parser");
const authRouter = require("./Routes/auth");
const profileRouter  = require("./Routes/profile");
const requestRouter = require("./Routes/request");
 app.use(express.json());
 app.use(cookieParser());

 app.use("/", authRouter);
 app.use("/", profileRouter);
 app.use("/", requestRouter);
 
   app.delete("/user", async (req,res)=>{
   const userId = req.body.userId;

   try{
    const user =  await User.findByIdAndDelete(userId);

       res.send(" user delete succefully");
   }catch(err)
   {
        res.status(404).send( "user deleted not succesfly" +err.message);
   }
   
   })

  app.get("/user", async (req,res)=>{
   const userEmail = req.body.emailId;

   try{
   const user = await  User.findOne({emailId:userEmail});
   if(!user){
    res.status(404).send("user not found ");
   }
   else{
    res.send(user);
   }
   
   }
   catch(err){
    res.status(500).send("something wend wrong"+err.message)
   }
})

app.get("/feed", async (req, res)=>{
  try{
    const users = await User.find({});
    res.send(users)
  
  }catch(err){
   res.status(404).send(" something went wrong check ")
  }
   
})


app.patch("/user", async (req,res)=>{
  const userId =   req.body.userId;
  const data = req.body;
try{ 


  const ALLOWED_UPDATES = ["userId", "skills","gender"," about","age"];
  
  const isUpdateAllowed = Object.keys(data).every((k)=>{
    return ALLOWED_UPDATES.includes(k)
  })
if(!isUpdateAllowed){
  throw new Error("update not allowed");
}

if(data?.skills.length > 10){
  throw new Error(" not allowed ");
}
  const user = await User.findByIdAndUpdate({_id:userId}, data, {returnDocument : "after", runValidators:true})
  console.log(user)
 res.send("updated succeful");
}
catch(err){
  res.status(404).send("updated failed" +err.message)
}
})

connectDB().then(
  ()=>{
    console.log(" database connection established");
    app.listen(7777,()=>{
      console.log("starting server running on port 3000");
    });
  }
)
.catch((err)=>{
  console.log(" database cannot be connected"+err.message);
})







