const model = require("../models/modelConfig");
const { Op } = require("sequelize");

const Student = model.students;
const AcademicYear = model.academicYear;
const Class = model.classes;
const Section = model.sections;
const Parent = model.parents;
const School = model.school;

const createStudent = async (req, res) => {
  const {
    academicYearId,
    classId,
    sectionId,
    id,
    joinedDate,
    admissionNumber,
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
    parentId,
    destinationId,
    schoolId,
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
    id,
    joinedDate,
    admissionNumber,
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
    parentId,
    destinationId,
    schoolId,
  };

  // image: req.file.originalName;
  await Student.create(payload);
  res.send(payload);
};

const getStudents = async (req, res) => {
  const employee = await Student.findAll({
    include: [AcademicYear, Class, Section, Parent],
    raw: true,
  });
  // console.log(employee.department.name);
  res.send(employee);
};

const getStudentBySchool = async (req, res) => {
  let schoolId = req.params.schoolId;

  const student = await Student.findAll({
    where: { schoolId: schoolId },
    include: [AcademicYear, Class, Section, Parent, School],
    raw: true,
  });
  // console.log(student.department.name);
  res.send(student);
};

const getStudentById = async (req, res) => {
  let id = req.params.id;

  const student = await Student.findOne({
    where: { id: id },
  });

  if (!student) return res.status(404).send(`student with id ${id} not found`);

  res.send(student);
};

const getStudentByDestinationId = async (req, res) => {
  let destinationId = req.params.destinationId;

  const student = await Student.findAll({
    where: { destinationId: destinationId },
    include: [AcademicYear, Class, Section, Parent],
    raw: true,
  });

  if (student === null)
    return res.status(404).send(`student with id ${id} not found`);

  res.send(student);
};

const getStudentBySection = async (req, res) => {
  let sectionId = req.params.sectionId;
  let schoolId = req.params.schoolId;

  const student = await Student.findAll({
    where: { [Op.and]: [{ schoolId: schoolId }, { sectionId: sectionId }] },
  });

  if (!student)
    return res
      .status(404)
      .send({ status: 404, message: `no students in this section` });

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

const deleteStudent = async (req, res) => {
  let id = req.params.id;

  const student = await Student.destroy({
    where: { studentIdId: id },
  });

  if (!student)
    return res
      .status(404)
      .send({ status: 404, message: `student with id ${id} not found` });

  res.send("deleted student");
};

module.exports = {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getStudentBySection,
  getStudentByDestinationId,
  getStudentBySchool,
};
