const express = require('express');


const app = express();

app.use("/pro",(req,res)=>{
  
  res.send("hahah")
  console.log(" hloii starting");
});

app.use("/",  (req,res)=>{
 res.send(" helloworld ");
});

app.listen(7777,()=>{
  console.log("starting server running on port 3000");
});





