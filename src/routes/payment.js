const express=require("express");
const { userAuth } = require("../middleware/auth");

const paymentRouter=express.Router();

paymentRouter.post("/payment/create", userAuth, async(req, res)=>{
    
})
module.exports=paymentRouter;