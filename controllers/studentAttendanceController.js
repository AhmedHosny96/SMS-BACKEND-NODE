const model = require("../models/modelConfig");

const StudentAttendance = model.studentAttendance;
const Student = model.students;
const Class = model.classes;
const Section = model.sections;
const School = model.school;

// const createStudentAttendance = async (req, res) => {
//   const { attendanceDate, status, studentId, remark } = req.body;

//   console.log(req.body);
//   // Iterate over each student ID and create attendance records
//   const createdRecords = [];
//   for (const studId of studentId) {
//     const existingAttendance = await StudentAttendance.findOne({
//       where: {
//         attendanceDate,
//         studentId: studId,
//       },
//     });

//     if (existingAttendance) {
//       return res.status(400).send({
//         status: 400,
//         message:
//           "Attendance record already exists for the student on the given date.",
//       });
//     }

//     const payload = {
//       attendanceDate,
//       status,
//       studId,
//       remark,
//     };

//     const createdRecord = await StudentAttendance.create(payload);
//     createdRecords.push(createdRecord);
//   }

//   res.send(createdRecords);
// };

const createStudentAttendance = async (req, res) => {
  const { attendanceDate, status, studentId, remark, schoolId, hasLeftHome } =
    req.body;

  try {
    const insertedRecords = [];

    for (let i = 0; i < studentId.length; i++) {
      const payload = {
        attendanceDate,
        status: status[i],
        studentId: studentId[i],
        remark,
        schoolId,
        hasLeftHome: hasLeftHome[i], // Use the corresponding value from the request
      };

      const insertedRecord = await StudentAttendance.create(payload);
      insertedRecords.push(insertedRecord);
    }

    res.status(201).json(insertedRecords);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating student attendance." });
  }
};

const getStudentAttendance = async (req, res) => {
  const attendance = await StudentAttendance.findAll({
    include: {
      model: Student,
      include: [Class, Section],
    },
    raw: true,
  });

  res.send(attendance);
};

const getStudentAttendanceBySchool = async (req, res) => {
  let schoolId = req.params.schoolId;
  const attendance = await StudentAttendance.findAll({
    where: { schoolId: schoolId },

    include: {
      model: Student,
      include: [Class, Section, School],
    },
    raw: true,
  });

  res.send(attendance);
};

const getStudentAttendanceById = async (req, res) => {
  let id = req.params.id;

  const attendance = await StudentAttendance.findOne({
    where: { id: id },
  });

  if (attendance === null)
    return res.status(404).send(`attendance with id ${id} not found`);

  res.send(attendance);
};

const updateStudentAttendance = async (req, res) => {
  let id = req.params.id;

  const attendance = await StudentAttendance.update(req.body, {
    where: { attendanceId: id },
  });

  if (attendance === null)
    return res.status(404).send(`attendance with id ${id} not found`);

  res.status(200).send(attendance);
};

const deleteStudentAttendance = async (req, res) => {
  let id = req.params.id;

  const attendance = await StudentAttendance.destroy({
    where: { attendanceId: id },
  });

  if (attendance === null)
    return res.status(404).send(`attendance with id ${id} not found`);

  res.send("deleted attendance");
};

module.exports = {
  createStudentAttendance,
  getStudentAttendance,
  getStudentAttendanceById,
  updateStudentAttendance,
  deleteStudentAttendance,
  getStudentAttendanceBySchool,
};
