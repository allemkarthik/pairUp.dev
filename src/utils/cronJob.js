const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const ConnectionRequestModel = require("../models/connectionRequest");

const {run} = require("./sendEmail");
const User = require("../models/user");
cron.schedule("00 8 * * *", async () => {
  //send emails to all people who got requests the previous day
  try {
    // this will give yesterday
    const yesterday = subDays(new Date(), 1);
    // start of yesterday (this will yesterday timestamp of 12:00am)
    const yesterdayStart = startOfDay(yesterday);
    //end of yesterday(11:59)
    const yesterdayEnd = endOfDay(yesterday);

    // find connections who all are intrested

    const pendingRequest = await ConnectionRequestModel.find({
      status: "interested",
      createdAt: {
        // this is all request at particular day (yesterday)
        $gte: yesterdayStart,
        $lt: yesterdayEnd,
      },
    }).populate("fromUserId toUserId");

    //list of emails and using set for unquie email ids ex: if i got 50 request then i only need one email
    const listOfEmail = [
      ...new Set(pendingRequest.map((req) => req.toUserId.emailID)),
    ];

    for (const email of listOfEmail) {
      //send emails
      try {
        const res = await run({
          toEmailId: email,
          subject: "New Connection Requests on PairUpDev",
          htmlBody: `
            <h2>You have pending connection requests!</h2>
            <p>Developers are waiting to connect with you on PairUpDev.com</p>
            <p>Log in to your account to review them.</p>
          `,
          textBody: "You have pending connection requests on PairUpDev.",
          
        });
        
      } catch (err) {
        err.message
      }
    }
  } catch (err) {
    console.error("Cron Job Error:", err);
  }
});

