// create a server

const express=require("express")

const app=express()

// this will only handle get call
app.get("/test",(req,res)=>{
    res.send({firstname:"karthik",lastname:"allem"})
})

// patch
app.patch("/patch",(req,res)=>{
    res.send("patch is done")
})

// put  

app.put("/put",(req,res)=>{
    res.send("put method")
})

// delete
app.delete("/delete",(req,res)=>{
    res.send("delete method")
})

// post
app.use("/post",(req,res)=>{
    res.send("data saved successfully in database")
})
// it will match all the http methods api calls
app.use("/hello",(req,res)=>{
    res.send("hello from the hello")
})


// server listener
app.listen(3000,()=>{
    console.log("server is listening successfully on port 3000....");
    
});