const model = require("../models/modelConfig");

const StudentAttendance = model.studentAttendance;
const Student = model.students;
const Period = model.periods;

const createStudentAttendance = async (req, res) => {
  const { studentId, periodId, status, date } = req.body;

  //   let section = await StudentAttendance.findOne({
  //     where: {
  //       name: name,
  //     },
  //   });

  //   if (attendance)
  //     return res.status(400).send("attendance with the same name exists");

  let payload = {
    studentId,
    periodId,
    status,
    date,
  };

  await StudentAttendance.create(payload);

  res.send(payload);
};

const getStudentAttendance = async (req, res) => {
  const attendance = await StudentAttendance.findAll({
    include: [Student, Period],
  });

  res.send(attendance);
};

const getStudentAttendanceById = async (req, res) => {
  let id = req.params.id;

  const attendance = await StudentAttendance.findOne({
    where: { attendanceId: id },
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
};
