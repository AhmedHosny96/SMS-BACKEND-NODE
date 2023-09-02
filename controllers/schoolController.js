const fs = require("fs");
const model = require("../models/modelConfig");
const School = model.school;
const bcrypt = require("bcrypt");

const User = model.users;

const { sendMessage } = require("../utils/twilioConfig");

const emailSender = require("../utils/MailSender");

const createSchool = async (req, res) => {
  const {
    name,
    country,
    city,
    address,
    principalName,
    contactEmail,
    phoneNumber,
    establishedYear,
    roleId,
    logo,
  } = req.body;

  let school = await School.findOne({
    where: {
      name: name,
      // code: code,
    },
  });

  // const logoPath = req.file.path;

  if (school)
    return res
      .status(400)
      .send({ status: 400, message: `school with the same name exists` });

  let payload = {
    name,
    country,
    city,
    address,
    principalName,
    contactEmail,
    phoneNumber,
    establishedYear,
    // logo: logoPath,
    roleId,
  };

  const createdSchool = await School.create(payload);

  // email credentials to schools , role : master admin

  function generateOTP() {
    const length = 6;
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let OTP = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      OTP += characters[randomIndex];
    }

    return OTP;
  }

  const otp = generateOTP();

  let user = await User.findOne({
    where: {
      email: contactEmail,
    },
  });

  if (user)
    return res.status(400).send({ status: 200, message: "Email is taken" });

  let userPayload = {
    name,
    phoneNumber,
    email: contactEmail,
    password: await bcrypt.hash(otp, 10),
    roleId,
    schoolId: createdSchool.id,
  };

  await User.create(userPayload);

  emailSender.sendEmail(
    `Your One-Time Password (OTP) for verification is:`,
    contactEmail,
    name,
    otp
  );

  sendMessage(
    phoneNumber,
    `Hi ${name} Here is your OTP : ${otp}
    `
  );

  res.send(payload);
};

const getSchools = async (req, res) => {
  const schools = await School.findAll({});

  res.send(schools);
};

const getSchoolById = async (req, res) => {
  let id = req.params.id;

  let school = await School.findOne({ where: { id: id } });

  if (!school)
    return res
      .status(404)
      .send({ status: 404, message: `school with id ${id} not found` });

  res.send(school);
};

const updateSchool = async (req, res) => {
  let id = req.params.id;

  let school = await School.update(req.body, { where: { id: id } });

  if (!school)
    return res
      .status(404)
      .send({ status: 404, message: `school with id ${id} not found` });

  res.status(200).send(school);
};

const deleteSchool = async (req, res) => {
  let id = req.params.id;

  const school = await School.destroy({ where: { id: id } });

  if (!school)
    return res
      .status(404)
      .send({ status: 404, message: `school with id ${id} not found` });

  res.send("deleted school");
};

module.exports = {
  createSchool,
  getSchools,
  getSchoolById,
  updateSchool,
  deleteSchool,
};
