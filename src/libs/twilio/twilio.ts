import * as twilio from 'twilio';

const twilioConfig = require('config/twilio.json');

const accountSid = twilioConfig['accountSid'];
const authToken = twilioConfig['authToken'];
const twilioNumber = twilioConfig['twilioNumber'];

const twilioClient = twilio(accountSid, authToken);

export const sendTwilioMessage = (body: string, number: string) => {
  twilioClient.messages.create({
    body: body,
    to: `+${number}`,
    from: `+${twilioNumber}`
  })
    .then((message) => {
    })
    .catch((err) => {
      console.log(err);
    });
};
