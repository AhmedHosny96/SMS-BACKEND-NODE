const model = require("../models/modelConfig");

const Term = model.semister;
const AcademicYear = model.academicYear;
const School = model.school;

const createTerm = async (req, res) => {
  const { name, academicYearId, startDate, endDate, schoolId, ethiopianDate } =
    req.body;

  let subject = await Term.findOne({
    where: {
      name,
      schoolId,
      academicYearId,
    },
  });

  if (subject)
    return res
      .status(400)
      .send({ status: 400, message: "term with the same name exists" });

  let payload = {
    name,
    academicYearId,
    startDate,
    endDate,
    schoolId,
    ethiopianDate,
  };
  await Term.create(payload);
  res.send(payload);
};

const getTerms = async (req, res) => {
  const academicYear = await Term.findAll({
    include: [AcademicYear, School],
    raw: true,
  });

  res.json(academicYear);
};

// get term by school

const getTermsBySchool = async (req, res) => {
  let schoolId = req.params;

  const semister = await Term.findAll({
    where: schoolId,
    include: [AcademicYear, School],
    raw: true,
  });

  if (semister.length == [])
    return res
      .status(404)
      .send({ status: 404, message: `no semisters not found` });

  res.json(semister);
};

const getTermById = async (req, res) => {
  let id = req.params.id;

  const academicYear = await Term.findOne({
    where: { termId: id },
  });

  if (academicYear === null)
    return res.status(404).send(`term with id ${id} not found`);

  res.send(academicYear);
};

const updateTerm = async (req, res) => {
  let id = req.params.id;

  const academicYear = await Term.update(req.body, {
    where: { termId: id },
  });

  if (academicYear === null)
    return res.status(404).send(`term with id ${id} not found`);

  res.status(200).send(academicYear);
};

const deleteTerm = async (req, res) => {
  let id = req.params.id;

  const academicYear = await Term.destroy({
    where: { termId: id },
  });

  if (academicYear === null)
    return res.status(404).send(`term with id ${id} not found`);

  res.send("deleted term");
};

module.exports = {
  createTerm,
  getTerms,
  getTermById,
  updateTerm,
  deleteTerm,
  getTermsBySchool,
};
