const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const model = require("../models/modelConfig");
const generateUsername = require("../utils/CredentialGenerator");

const { sendMessage } = require("../utils/twilioConfig");

const emailSender = require("../utils/MailSender");
const Parent = model.parents;
const Student = model.students;
const Class = model.classes;
const Section = model.sections;
const User = model.users;
const School = model.school;
const Session = model.academicYear;

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

// const getParents = async (req, res) => {
//   const parents = await Parent.findAll({
//     include: [Student, School],
//     raw: true,
//   });

//   res.send(parents);
// };

const getParentsBySchool = async (req, res) => {
  try {
    const parents = await Parent.findAll({
      include: [
        {
          model: Student,
          include: [
            { model: Class }, // Assuming the Class model is associated with the Student model
            { model: Section }, // Assuming the Section model is associated with the Student model
            { model: Session }, // Assuming the Section model is associated with the Student model
          ],
        },
        { model: School },
      ],
      raw: true,
    });

    const formattedParents = {};

    parents.forEach((parent) => {
      const id = parent.id;
      const parentName = parent.fullName;
      const relationshipType = parent.relationshipType;
      const occupation = parent.occupation;
      const email = parent.email;
      const phoneNumber = parent.phoneNumber;
      const status = parent.status;

      if (!formattedParents[parentName]) {
        formattedParents[parentName] = {
          id,
          parentName,
          relationshipType,
          occupation,
          phoneNumber,
          email,
          status,

          // Add other parent-specific properties here (e.g., parent IDs, etc.)
          students: [],
        };
      }

      const studentFullName = `${parent["students.firstName"]} ${parent["students.middleName"]} ${parent["students.lastName"]}`;

      formattedParents[parentName].students.push({
        id: parent["students.id"],
        admissionNumber: parent["students.admissionNumber"],
        academicYear: parent["students.academicYear.name"],
        fullname: studentFullName.trim(),
        class: parent["students.Class.name"],
        section: parent["students.Section.name"],
        joinedDate: parent["students.joinedDate"],
        // Include other student properties as needed
      });
    });

    res.send(Object.values(formattedParents));
  } catch (error) {
    res.status(500).send({ message: "Error retrieving parents", error });
  }
};

const getParentById = async (req, res) => {
  let { id, schoolId } = req.params.id;

  const parent = await Parent.findOne({ where: { id, schoolId } });

  if (!parent)
    return res
      .status(404)
      .send({ status: 404, message: `parent with id ${id} not found` });

  res.send(parent);
};

const updateParent = async (req, res) => {
  const { id, schoolId } = req.params; // Destructure 'id' directly from req.params

  try {
    const [updatedRowsCount, updatedParent] = await Parent.update(req.body, {
      where: { id, schoolId },
      returning: true, // To get the updated parent data
    });

    if (updatedRowsCount === 0) {
      return res
        .status(404)
        .json({ status: 404, message: `Parent with ID ${id} not found` });
    }

    res.status(200).json(req.body); // Send back the updated parent data
  } catch (error) {
    console.error("Error updating parent:", error);
    res.status(500).json({ status: 500, message: "Internal server error" });
  }
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
  // getParents,
  getParentById,
  updateParent,
  deleteParent,
  getParentsBySchool,
};
