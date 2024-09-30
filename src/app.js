const express = require('express');
const connectDB = require('./config/database')

const app = express();
const User = require("./models/user")

   app.use(express.json());



   app.delete("/user", async(req, res)=>{
     const userId = req.body.userId;

     try{
      const user =  await  User.findByIdAndDelete(userId);
      res.send("deleted succefly");
      }
   catch(err){
    res.status(500).send("something wend wrong"+err.message)
   }

   });

  app.post("/user", async (req,res)=>{
   const userEmail = req.body.emailId;

   try{
   const user = await  User.findOne({emailId:userEmail});
   if(!user){
    res.status(404).send("something went wrong ");

   }
   else{
    res.send(user);
   }
   
   }
   catch(err){
    res.status(500).send("something wend wrong"+err.message)
   }
})



app.post("/signup", async (req,res)=>{
  console.log(req.body);
 const user = new User(req.body);

 try{
  await user.save();
  res.send("USER adder successfully")
 }
 catch(err){
  res.status(500).send("something went wrong ", + err.message)
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
  console.log(" database cannot be connected   ")
})







