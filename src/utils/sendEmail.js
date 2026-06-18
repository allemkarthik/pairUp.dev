const { SendEmailCommand } = require("@aws-sdk/client-ses");
const { sesClient } = require("./sesClient");

const createSendEmailCommand = (toAddress) => {
  return new SendEmailCommand({
    Destination: {
      ToAddresses: [toAddress],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: "<h1>Welcome to PairUpDev</h1>",
        },
        Text: {
          Charset: "UTF-8",
          Data: "Welcome to PairUpDev",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "PairUpDev Notification",
      },
    },
    Source: "no-reply@pairupdev.com",
  });
};

const run = async () => {
  const command = createSendEmailCommand("karthikallem7@gmail.com");

  try {
    return await sesClient.send(command);
  } catch (err) {
    console.log("SES Error:", err);
    throw err;
  }
};

module.exports = { run };