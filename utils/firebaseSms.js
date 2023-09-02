const admin = require("firebase-admin");
const serviceAccount = require("./sms-a572d-firebase-adminsdk-3mbn8-de20dddf65.json"); // Replace with the path to your Firebase service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

function sendMessage(phoneNumber, message) {
  return admin.messaging().send({
    data: {
      body: message,
    },
    token: phoneNumber,
  });
}

module.exports = { sendMessage };
