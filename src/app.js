const express = require('express');


const app = express();



app.use("/profile",  (req,res,next)=>{
  console.log("haii")
  const token= 'xywz'
  if(token=== 'xyz'){
    res.send('hahha')
  }
  else{
    next();
  }
 
  
 },(req,res,next)=>{
 next()
},(req,res)=>{
  res.status(404).send("something went wrong")
})


app.get("/profile/name",(req,res)=>{
  
  res.send("hahah")
  console.log(" hloii starting");
});



app.listen(7777,()=>{
  console.log("starting server running on port 3000");
});





