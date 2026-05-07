const mongoose = require("mongoose");

const connectionrequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  {
    timestamps: true,
  },
);

// compound indexs
connectionrequestSchema.index({fromUserId:1, toUserId:1});


// pre middleware to itslef connections
connectionrequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  //check if fromuserid is same as touserid
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("cannot send connection request to yourself");
  }
  next();
});

const ConnectionRequestModel = new mongoose.model(
  "ConnectionRequest",
  connectionrequestSchema,
);
module.exports = ConnectionRequestModel;
