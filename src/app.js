// create a server

const express = require("express");

const app = express();
app.get("/getuserdata",(req,res)=>{
    try{
        throw new Error("sdgafgs")
        res.send("user data sent")
    }
    catch(err){
        res.status(500).send("contact support team")
    }
})

// error handling
app.use("/",(err,req,res,next)=>{
    if(err){
        res.send("something went wrong")
    }
})


app.get("/deleteuser",(req,res)=>{
    res.send("user deleted")

})




// server listener
app.listen(3000, () => {
  console.log("server is listening successfully on port 3000....");
});
