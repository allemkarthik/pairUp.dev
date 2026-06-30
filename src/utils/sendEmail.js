const { SendEmailCommand } = require("@aws-sdk/client-ses");
const { sesClient } = require("./sesClient");

const createSendEmailCommand = (toEmailId, subject, htmlBody, textBody) => {
  return new SendEmailCommand({
    Destination: {
      ToAddresses: [toEmailId],
    },
    Message: {
       Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: htmlBody,
        },
        Text: {
          Charset: "UTF-8",
          Data: textBody,
        },
      },
    },
    Source: process.env.AWS_SES_FROM_EMAIL,
  });
};

const run = async ({toEmailId, subject, htmlBody, textBody}) => {
  const command = createSendEmailCommand(
    "allemkarthik@gmail.com",
    subject,
    htmlBody,
    textBody,
  );

  try {
    return await sesClient.send(command);
  } catch (err) {
    console.log("SES Error:", err);
    throw err;
  }
};

module.exports = { run };
