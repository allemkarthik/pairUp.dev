// create a server

const express=require("express")

const app=express()

app.use("/test",(req,res)=>{
    res.send("hello from the test")
})
// reauest handler
app.use("/hello",(req,res)=>{
    res.send("hello from the hello")
})
// reauest handler
app.use("/profile",(req,res)=>{
    res.send("hello from the profile.......")
})


// server listener
app.listen(3000,()=>{
    console.log("server is listening successfully on port 3000....");
    
});