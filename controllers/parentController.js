const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const model = require("../models/modelConfig");
const generateUsername = require("../utils/CredentialGenerator");

const { sendMessage } = require("../utils/twilioConfig");

const emailSender = require("../utils/MailSender");
const Parent = model.parents;
const Student = model.students;
const Class = model.classes;
const User = model.users;
const School = model.school;

const createParent = async (req, res) => {
  const {
    fullName,
    phoneNumber,
    email,
    occupation,
    relationshipType,
    roleId,
    schoolId,
  } = req.body;

  const parent = await Parent.findOne({
    where: {
      [Op.and]: [
        {
          phoneNumber: phoneNumber, // Check for the same name
        },
        {
          schoolId: schoolId, // Check for the same schoolId
        },
      ],
    },
  });

  if (parent)
    return res.status(400).send({
      status: 400,
      message: "parent with the same phone number exists",
    });

  let payload = {
    fullName,
    phoneNumber,
    email,
    occupation,
    relationshipType,
    roleId,
    schoolId,
  };

  await Parent.create(payload);

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

  let user = await User.findOne({
    where: {
      email: email,
    },
  });

  if (user)
    return res.status(400).send({ status: 200, message: "Email is taken" });

  let userPayload = {
    name: fullName,
    phoneNumber,
    email,
    password: await bcrypt.hash(otp, 10),
    roleId,
  };

  await User.create(userPayload);

  emailSender.sendEmail(email, fullName, otp);

  sendMessage(
    phoneNumber,
    `Hi ${fullName} Here is your OTP : ${otp}
    `
  );

  res.send(payload);
};

const getParents = async (req, res) => {
  const parents = await Parent.findAll({
    include: [Student, School],
    raw: true,
  });

  res.send(parents);
};

const getParentsBySchool = async (req, res) => {
  let schoolId = req.params.schoolId;

  const parents = await Parent.findAll({
    where: { schoolId: schoolId },
    include: [Student, School],
    raw: true,
  });

  res.send(parents);
};

const getParentById = async (req, res) => {
  let id = req.params.id;

  const parent = await Parent.findOne({ where: { id: id } });

  if (!parent)
    return res
      .status(404)
      .send({ status: 404, message: `parent with id ${id} not found` });

  res.send(parent);
};

const updateParent = async (req, res) => {
  let id = req.params.id;

  const parent = await Parent.update(req.body, { where: { parentId: id } });

  if (!parent)
    return res
      .status(404)
      .send({ status: 404, message: `parent with id ${id} not found` });

  res.status(200).send(parent);
};

const deleteParent = async (req, res) => {
  let id = req.params.id;

  const parent = await Parent.destroy({ where: { parentID: id } });

  if (!parent)
    return res
      .status(404)
      .send({ status: 404, message: `parent with id ${id} not found` });

  res.send("deleted parent");
};

module.exports = {
  createParent,
  getParents,
  getParentById,
  updateParent,
  deleteParent,
  getParentsBySchool,
};
