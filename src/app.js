// create a server

const express = require("express");

const app = express();

const {adminAuth}=require("./middleware/auth")

app.use("/admin",adminAuth)

app.get("/admin/getadminalldata",(req,res)=>{
    res.send("all daata send")

})


app.get("/deleteuser",(req,res)=>{
    res.send("user deleted")

})




// server listener
app.listen(3000, () => {
  console.log("server is listening successfully on port 3000....");
});
