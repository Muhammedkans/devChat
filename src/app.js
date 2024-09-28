const express = require('express');


const app = express();

app.use("/", (req,res)=>{
  throw new Error(" halooi");
  
  res.send("hahah")
})

app.use("/profile", (err,req,res,next)=>{
  
  if(err){
    res.status(500).send("something went wrong");
  }
})



app.listen(7777,()=>{
  console.log("starting server running on port 3000");
});





