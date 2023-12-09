// const twilio = require("twilio")(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

// // for single customer

// const sendMessage = (toPhoneNumber, body) => {
//   twilio.messages
//     .create({
//       to: toPhoneNumber,
//       from: process.env.TWILIO_PHONE_NUMBER,
//       body: body,
//     })
//     .then((message) => {
//       console.log(message.sid);
//     })
//     .catch((err) => console.error(err));
// };

// // for multiple cleints

// const sendBulkSms = (body, numbers) => {
//   var numberList = [];

//   for (i = 0; i < numberList.length; i++) {
//     numbers.push(JSON.stringify({ binding_type: "sms", address: numbers[i] }));
//   }

//   const notificationOptions = {
//     toBinding: numberList,
//     body: body,
//   };

//   twilio.notify
//     .services(process.env.MESSAGE_SERVICEID)
//     .notifications.create(notificationOptions)
//     .then((notification) => console.log(notification.sid))
//     .catch((err) => console.error(err));
// };

// module.exports = {
//   sendMessage,
//   sendBulkSms,
// };
