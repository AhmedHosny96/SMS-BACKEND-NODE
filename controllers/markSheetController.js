const model = require("../models/modelConfig");

const Marks = model.studentMarks;
const Students = model.students;
const Subjects = model.subjects;
const School = model.school;

const createMarks = async (req, res) => {
  const { studentId, subjectId, totalMarks, marksObtained, schoolId } =
    req.body;

  //   let period = await Marks.findOne({
  //     where: {
  //       name: name,
  //     },
  //   });

  //   if (period) return res.status(400).send("period with the same name exists");

  let payload = {
    studentId,
    subjectId,
    totalMarks,
    marksObtained,
    schoolId,
  };

  await Marks.create(payload);

  res.send(payload);
};

const getMarks = async (req, res) => {
  const marks = await Marks.findAll({
    include: [Students, Subjects],
    raw: true,
  });

  res.send(marks);
};

const getMarksBySchool = async (req, res) => {
  let schoolId = req.params.schoolId;

  const marks = await Marks.findAll({
    where: { schoolId: schoolId },
    include: [Students, Subjects, School],
    raw: true,
  });

  res.send(marks);
};

const getMarksById = async (req, res) => {
  let id = req.params.id;

  const marks = await Marks.findOne({ where: { id: id } });

  if (marks === null)
    return res
      .status(404)
      .send({ status: 404, message: `marks with id ${id} not found` });

  res.send(marks);
};

const updateMarks = async (req, res) => {
  let id = req.params.id;

  const marks = await Marks.update(req.body, { where: { id: id } });

  if (marks === null)
    return res
      .status(404)
      .send({ status: 404, message: `marks with id ${id} not found` });

  res.status(200).send(marks);
};

const deleteMarks = async (req, res) => {
  let id = req.params.id;

  const marks = await Marks.destroy({ where: { id: id } });

  if (marks === null)
    return res
      .status(404)
      .send({ status: 404, message: `marks with id ${id} not found` });

  res.send("deleted marks");
};

module.exports = {
  createMarks,
  getMarks,
  getMarksById,
  updateMarks,
  deleteMarks,
  getMarksBySchool,
};
