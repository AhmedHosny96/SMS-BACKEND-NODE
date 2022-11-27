const model = require("../models/modelConfig");

const Student = model.students;
const AcademicYear = model.academicYear;
const Class = model.classes;
const Section = model.sections;

const createStudent = async (req, res) => {
  const {
    academicYearId,
    classId,
    sectionId,
    joinedDate,
    uniqueId,
    rollNo,
    firstName,
    middleName,
    lastName,
    dob,
    gender,
    phoneNumber,
    country,
    city,
    subCity,
    kebele,
    previousSchoolName,
    previousSchoolAddress,
    previousQualification,
  } = req.body;

  //   let student = await Student.findOne({
  //     where: {
  //       phoneNumber: phoneNumber,
  //     },
  //   });

  //   if (student) return res.status(400).send("student with the same name exists");

  let payload = {
    academicYearId,
    classId,
    sectionId,
    joinedDate,
    uniqueId,
    rollNo,
    firstName,
    middleName,
    lastName,
    dob,
    gender,
    phoneNumber,
    country,
    city,
    subCity,
    kebele,
    previousSchoolName,
    previousSchoolAddress,
    previousQualification,
  };

  // image: req.file.originalName;
  await Student.create(payload);
  res.send(payload);
};

const getStudents = async (req, res) => {
  const employee = await Student.findAll({
    include: [AcademicYear, Class, Section],
  });
  // console.log(employee.department.name);
  res.send(employee);
};

const getStudnentById = async (req, res) => {
  let id = req.params.id;

  const student = await Student.findOne({
    where: { employeeId: id },
  });

  if (student === null)
    return res.status(404).send(`student with id ${id} not found`);

  res.send(student);
};

const updateStudent = async (req, res) => {
  let id = req.params.id;

  const student = await Student.update(req.body, {
    where: { studentId: id },
  });

  if (student === null)
    return res.status(404).send(`student with id ${id} not found`);

  res.status(200).send(student);
};

const deletStudent = async (req, res) => {
  let id = req.params.id;

  const student = await Student.destroy({
    where: { studentIdId: id },
  });

  if (student === null)
    return res.status(404).send(`student with id ${id} not found`);

  res.send("deleted student");
};

module.exports = {
  createStudent,
  getStudents,
  getStudnentById,
  updateStudent,
  deletStudent,
};
