// create a server

const express=require("express")

const app=express()

// reauest handler
app.use((req,res)=>{
    res.send("hello from the server")
})

// server listener
app.listen(3000,()=>{
    console.log("server is listening successfully on port 3000....");
    
});