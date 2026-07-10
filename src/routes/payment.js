const express = require("express");
const { userAuth } = require("../middleware/auth");
const instance = require("../utils/razorpay");
const paymentSchema = require("../models/paymentSchema");
const { membershipAmount } = require("../utils/data");


const paymentRouter = express.Router();

paymentRouter.post("/payment/create", userAuth, async (req, res) => {
  try {
    //it is coming from frontend that is body
    const {membershipType}= req.body

    //get the user details from userAuth  middleware
    const {firstName, lastName, emailID}= req.user;

    //

    //create an order for payment in razorpay
    const order = await instance.orders.create({
      amount: membershipAmount[membershipType]*100,
      currency: "USD",
      receipt: "receipt#1",
      notes: {
        firstName,
        lastName,
        emailID,
        membershipType: membershipType,
      },
    });

    //save it in my db
    console.log(order)
    const payment= new paymentSchema({
        userId: req.user._id,
        orderId: order.id,
        status: order.status,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
        notes: order.notes,
    });

    const savedPayment= await payment.save();

    //return back my order details to frontend
    res.json({...savedPayment.toJSON()})
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});
module.exports = paymentRouter;
