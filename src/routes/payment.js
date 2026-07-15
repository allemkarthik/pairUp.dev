const express = require("express");
const { userAuth } = require("../middleware/auth");
const instance = require("../utils/razorpay");
const paymentSchema = require("../models/paymentSchema");
const { membershipAmount } = require("../utils/data");
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");
const User = require("../models/user");

const paymentRouter = express.Router();


//api for create order in razorpay

paymentRouter.post("/payment/create", userAuth, async (req, res) => {
  try {
    //it is coming from frontend that is body
    const { membershipType } = req.body;

    //get the user details from userAuth  middleware
    const { firstName, lastName, emailID } = req.user;

    //

    //create an order for payment in razorpay
    const order = await instance.orders.create({
      amount: membershipAmount[membershipType] * 100,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        firstName,
        lastName,
        emailID,
        membershipType: membershipType,
      },
    });

    //save it in my db
    console.log(order);
    const payment = new paymentSchema({
      userId: req.user._id,
      orderId: order.id,
      status: order.status,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      notes: order.notes,
    });

    const savedPayment = await payment.save();

    //return back my order details to frontend
    res.json({ ...savedPayment.toJSON(), keyId: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

//webhook for payment captured and payment is failed
paymentRouter.post("/payment/webhook", async (req, res) => {
  try {
    const webhookSignature = req.get("X-Razorpay-Signature");

    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET,
    );

    if(!isWebhookValid){
        return res.status(400).json({msg: "webhook signature is invalid"})
    }
    //update my payment status in DB
    const paymentDetails=req.body.payload.payment.entity;
    const paymentStatus= await payment.findOne({orderId: paymentDetails.order_id})

    //updae status
    paymentStatus.status= paymentDetails.status;
    await paymentStatus.save()


    //update the user as premium

    const user= await User.findOne({_id: paymentStatus_userId})
    user.isPremium=true;
    user.membershipType=paymentStatus.notes.membershipType;
    await user.save();

    // //return success response to razorpay
    // if(req.body.event== "payment.captured"){

    // }
    // if(req.body.event== "payment.failed"){

    // }

    return res.status(200).json({msg: "webhook received successfully"})

  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});


//update UI for payment captured users 
paymentRouter.get("premium/verify", userAuth, async (req, res)=>{
    const user=req.user.toJSON();
    if(user.isPremium){
        return res.json({isPremium: true});
    }
    return res.json({isPremium: false});
})
module.exports = paymentRouter;
