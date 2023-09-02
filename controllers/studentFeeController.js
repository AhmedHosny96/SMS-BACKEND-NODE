const model = require("../models/modelConfig");

const StudentFee = model.studentFee;

const Student = model.students;
const School = model.school;

const createStudentFee = async (req, res) => {
  const {
    studentId,
    feeMonth,
    amount,
    paymentDate,
    paymentMode,
    schoolId,
    receiptNumber,
  } = req.body;

  let subject = await StudentFee.findOne({
    where: {
      receiptNumber: receiptNumber,
    },
  });

  if (subject)
    return res.status(400).send("student fee with the same name exists");

  let payload = {
    studentId,
    feeMonth,
    amount,
    paymentDate,
    paymentMode,
    schoolId,
    receiptNumber,
  };
  await StudentFee.create(payload);
  res.send(payload);
};

const getStudentFees = async (req, res) => {
  const studentFee = await StudentFee.findAll({
    include: [Student],
    raw: true,
  });
  res.send(studentFee);
};

const getStudentFeesBySchool = async (req, res) => {
  let schoolId = req.params.schoolId;
  const studentFee = await StudentFee.findAll({
    where: { schoolId: schoolId },

    include: [Student, School],
    raw: true,
  });
  res.send(studentFee);
};

const getStudentFeeById = async (req, res) => {
  let id = req.params.id;

  const academicYear = await StudentFee.findOne({
    where: { id: id },
  });

  if (academicYear === null)
    return res.status(404).send(`student fee with id ${id} not found`);

  res.send(academicYear);
};

const updateStudentFee = async (req, res) => {
  let id = req.params.id;

  const academicYear = await StudentFee.update(req.body, {
    where: { id: id },
  });

  if (academicYear === null)
    return res.status(404).send(`student fee with id ${id} not found`);

  res.status(200).send(academicYear);
};

const deleteStudentFeeById = async (req, res) => {
  let id = req.params.id;

  const academicYear = await StudentFee.destroy({
    where: { academicYearId: id },
  });

  if (academicYear === null)
    return res.status(404).send(`student fee with id ${id} not found`);

  res.send("deleted session");
};

module.exports = {
  createStudentFee,
  getStudentFees,
  getStudentFeeById,
  updateStudentFee,
  deleteStudentFeeById,
  getStudentFeesBySchool,
};
