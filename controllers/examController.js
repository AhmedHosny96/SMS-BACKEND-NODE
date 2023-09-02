const model = require("../models/modelConfig");

const Exam = model.exams;
const Class = model.classes;
const Section = model.sections;
const AcademicYear = model.academicYear;
const Term = model.terms;
const Subject = model.subjects;

const createExam = async (req, res) => {
  const {
    name,
    type,
    maxMarks,
    passMarks,
    academicYearId,
    termId,
    classId,
    date,
    startTime,
    endTime,
  } = req.body;

  let exam = await Exam.findOne({
    where: {
      name: name,
    },
  });

  if (exam) return res.status(400).send("asset with the same name exists");

  let payload = {
    name,
    type,
    maxMarks,
    passMarks,
    academicYearId,
    termId,
    classId,
    date,
    startTime,
    endTime,
  };
  await Exam.create(payload);
  res.send(payload);
};

const getExams = async (req, res) => {
  const exam = await Exam.findAll({
    include: [AcademicYear, Term, Class, Section, Subject],
    raw: true,
  });
  res.send(exam);
};

const getExamById = async (req, res) => {
  let id = req.params.id;

  const exam = await Exam.findOne({
    where: { examId: id },
  });

  if (exam === null)
    return res.status(404).send(`Exam with id ${id} not found`);

  res.send(exam);
};

const updateExam = async (req, res) => {
  let id = req.params.id;

  const exam = await Exam.update(req.body, {
    where: { ExamId: id },
  });

  if (exam === null)
    return res.status(404).send(`Exam with id ${id} not found`);

  res.status(200).send(exam);
};

const deleteExam = async (req, res) => {
  let id = req.params.id;

  const exam = await Exam.destroy({
    where: { examId: id },
  });

  if (exam === null)
    return res.status(404).send(`Exam with id ${id} not found`);

  res.send("deleted Exam");
};

module.exports = {
  createExam,
  getExams,
  getExamById,
  updateExam,
  deleteExam,
};
