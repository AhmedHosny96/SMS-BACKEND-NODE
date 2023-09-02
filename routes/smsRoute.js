const router = require("express").Router();
const { sendMessage, sendBulkSms } = require("../utils/twilioConfig");

router.post("/", async (req, res) => {
  const { phoneNumber, body } = req.body;

  sendMessage(phoneNumber, body);

  res.send("successfully sent");
});

router.post("-bulk", async (req, res) => {
  const { phoneNumbers, body } = req.body;

  sendBulkSms(body, phoneNumbers);
  res.send("bulk sms sent successfully");
});

module.exports = router;
