const express = require('express');
const connectDB = require('./config/database')

const app = express();
const User = require("./models/user")


app.post("/signup", async (req,res)=>{
 const user = new User({
  firstName:"Muhammed",
  lastName:"Kans",
  emailId: "kanskabeer@gmail.com",
  password:"kans123",
 });

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







