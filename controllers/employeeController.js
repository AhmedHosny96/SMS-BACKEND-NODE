const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const model = require("../models/modelConfig");
const generateUsername = require("../utils/CredentialGenerator");

const { sendMessage } = require("../utils/twilioConfig");

const emailSender = require("../utils/MailSender");

const Employee = model.employees;
const Department = model.departments;

const User = model.users;
const School = model.school;

const createEmployee = async (req, res) => {
  const {
    departmentId,
    roleId,
    joinedDate,
    qualification,
    totalExperience,
    fullName,
    employeeNumber,
    dob,
    gender,
    phoneNumber,
    email,
    country,
    city,
    salary,
    status,
    subCity,
    kebele,
    schoolId,
  } = req.body;

  let employee = await Employee.findOne({
    where: {
      phoneNumber: phoneNumber,
    },
  });

  if (employee)
    return res
      .status(400)
      .send({ status: 400, message: "Phone number is taken" });

  let payload = {
    departmentId,
    roleId,
    joinedDate,
    qualification,
    totalExperience,
    fullName,
    employeeNumber,
    dob,
    gender,
    phoneNumber,
    email,
    country,
    city,
    salary,
    status,
    subCity,
    kebele,
    schoolId,
  };

  // image: req.file.originalName;
  await Employee.create(payload);

  // create user object
  const username = generateUsername();

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

  console.log("OTP : {}", otp);

  let user = await User.findOne({
    where: { email: email },
  });

  if (user)
    return res
      .status(400)
      .send({ status: 400, message: "Username or email is taken" });

  let userPayload = {
    username,
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

const getEmployees = async (req, res) => {
  const employee = await Employee.findAll({
    include: [Department],
    raw: true,
  });
  res.send(employee);
};

const getEmployeesBySchool = async (req, res) => {
  let schoolId = req.params.schoolId;
  const employee = await Employee.findAll({
    where: { schoolId: schoolId },
    include: [Department, School],
    raw: true,
  });
  res.send(employee);
};

const getEmployeeById = async (req, res) => {
  let id = req.params.id;

  const academicYear = await Employee.findOne({
    where: { id: id },
  });

  if (academicYear === null)
    return res
      .status(404)
      .send({ status: 404, message: `Employee with id ${id} not found` });

  res.send(academicYear);
};

const updateEmployee = async (req, res) => {
  let id = req.params.id;

  const academicYear = await Employee.update(req.body, {
    where: { employeeId: id },
  });

  if (academicYear === null)
    return res
      .status(404)
      .send({ status: 404, message: `Employee with id ${id} not found` });

  res.status(200).send(academicYear);
};

const deleteEmployee = async (req, res) => {
  let id = req.params.id;

  const academicYear = await Employee.destroy({
    where: { academicYearId: id },
  });

  if (academicYear === null)
    return res
      .status(404)
      .send({ status: 404, message: `Employee with id ${id} not found` });

  res.send("deleted Employee");
};

module.exports = {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getEmployeesBySchool,
};
