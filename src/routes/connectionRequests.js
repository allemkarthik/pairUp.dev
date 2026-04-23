const express=require("express");
const { userAuth } = require("../middleware/auth");

const requestRouter=express.Router();

requestRouter.post("/sendConnectionRequest", userAuth,async(req,res)=>{
    const user=req.user
    res.send(user.firstName+"connection request sent")
})

module.exports=requestRouter;