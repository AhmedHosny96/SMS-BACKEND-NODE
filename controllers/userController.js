const bcrypt = require("bcrypt");
const model = require("../models/modelConfig");
const { sendMessage } = require("../utils/twilioConfig");
const emailSender = require("../utils/MailSender");
const { Op } = require("sequelize");

const User = model.users;
const Role = model.roles;
const Permission = model.permissions;
const School = model.school;

const getUser = async (req, res) => {
  const user = await User.findAll({
    attributes: { exclude: ["password"] },
    include: {
      model: Role,
      // include: Permission,
    },
    raw: true,
  });
  res.send(user);
};

const getUsersBySchool = async (req, res) => {
  let schoolId = req.params.schoolId;

  const user = await User.findAll({
    where: { schoolId: schoolId },
    attributes: { exclude: ["password"] },
    include: {
      model: Role,
      include: School,
    },
    raw: true,
  });
  res.send(user);
};

const getUserById = async (req, res) => {
  let id = req.params.id;

  let user = await User.findByPk(id);

  if (!user)
    return res.status(404).json({ status: 404, message: "user not found" });

  user = await User.findOne(
    {
      attributes: { exclude: ["password"] },
      include: {
        model: Role,
        include: Permission,
      },
    },
    { where: { id: id } }
  );
  res.send(user);
};

const updateUser = async (req, res) => {
  let id = req.params.id;

  const user = await User.update(req.body, { where: { id: id } });

  if (!user)
    return res
      .status(404)
      .send({ status: 404, message: `user with id ${id} not found` });

  res.status(200).send(user);
};

const deleteUser = async (req, res) => {
  let id = req.params.id;

  const user = await User.destroy({ where: { id: id } });

  if (!user)
    return res
      .status(404)
      .send({ status: 404, message: `user with id ${id} not found` });

  res.send("deleted user");
};

const resetPassword = async (req, res) => {
  const userId = req.params.userId;

  const user = await User.findByPk(userId);

  if (!user) {
    return res.status(404).json({ status: 404, message: "User not found" });
  }
  // send email and sms

  function generateOTP() {
    const length = 6;
    const digits = "0123456789";
    let OTP = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * digits.length);
      OTP += digits[randomIndex];
    }
    return OTP;
  }

  const otp = generateOTP();
  // reset firstTimeLogin to true , and status to false
  emailSender.sendEmail(
    `Your password has been reset successfully use this OTP`,
    user.email,
    user.name,
    otp
  );
  // sms OTP
  sendMessage(
    user.phoneNumber,
    `Hi ${user.name} Here is your OTP : ${otp}
    `
  );

  user.isFirstLogin = true;
  user.status = false;
  user.password = await bcrypt.hash(otp, 10);

  console.log("OTP : ", otp);

  await user.save();

  res.send({
    status: 200,
    message: "Password reset successfully , OTP sent via email and SMS",
  });
};

module.exports = {
  getUser,
  getUserById,
  updateUser,
  deleteUser,
  resetPassword,
  getUsersBySchool,
};
