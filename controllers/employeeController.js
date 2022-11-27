const e = require("cors");
const model = require("../models/modelConfig");

const Employee = model.employees;
const Titles = model.jobtitles;
const Department = model.departments;

const createEmployee = async (req, res) => {
  const {
    departmentId,
    titleId,
    joinedDate,
    qualification,
    totalExperience,
    firstName,
    middleName,
    lastName,
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
  } = req.body;

  let subject = await Employee.findOne({
    where: {
      phoneNumber: phoneNumber,
    },
  });

  if (subject)
    return res.status(400).send("Employee with the same name exists");

  let payload = {
    departmentId,
    titleId,
    joinedDate,
    qualification,
    totalExperience,
    firstName,
    middleName,
    lastName,
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
  };

  // image: req.file.originalName;
  await Employee.create(payload);
  res.send(payload);
};

const getEmployees = async (req, res) => {
  const employee = await Employee.findAll({
    include: [Titles, Department],
  });
  res.send(employee);
};

const getEmployeeById = async (req, res) => {
  let id = req.params.id;

  const academicYear = await Employee.findOne({
    where: { employeeId: id },
  });

  if (academicYear === null)
    return res.status(404).send(`Employee with id ${id} not found`);

  res.send(academicYear);
};

const updateEmployee = async (req, res) => {
  let id = req.params.id;

  const academicYear = await Employee.update(req.body, {
    where: { employeeId: id },
  });

  if (academicYear === null)
    return res.status(404).send(`Employee with id ${id} not found`);

  res.status(200).send(academicYear);
};

const deleteEmployee = async (req, res) => {
  let id = req.params.id;

  const academicYear = await Employee.destroy({
    where: { academicYearId: id },
  });

  if (academicYear === null)
    return res.status(404).send(`Employee with id ${id} not found`);

  res.send("deleted Employee");
};

module.exports = {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
