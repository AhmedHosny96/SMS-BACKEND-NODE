const model = require("../models/modelConfig");

const Term = model.terms;
const AcademicYear = model.academicYear;

const createTerm = async (req, res) => {
  const { name, academicYearId, startDate, endDate, ethiopianDate } = req.body;

  let subject = await Term.findOne({
    where: {
      name: name,
    },
  });

  if (subject)
    return res.status(400).send("AcademicYear with the same name exists");

  let payload = {
    name,
    academicYearId,
    startDate,
    endDate,
    ethiopianDate,
  };
  await Term.create(payload);
  res.send(payload);
};

const getTerms = async (req, res) => {
  const academicYear = await Term.findAll({ include: AcademicYear });
  res.send(academicYear);
};

const getTermById = async (req, res) => {
  let id = req.params.id;

  const academicYear = await Term.findOne({
    where: { termId: id },
  });

  if (academicYear === null)
    return res.status(404).send(`AcademicYear with id ${id} not found`);

  res.send(academicYear);
};

const updateTerm = async (req, res) => {
  let id = req.params.id;

  const academicYear = await Term.update(req.body, {
    where: { termId: id },
  });

  if (academicYear === null)
    return res.status(404).send(`AcademicYear with id ${id} not found`);

  res.status(200).send(academicYear);
};

const deleteTerm = async (req, res) => {
  let id = req.params.id;

  const academicYear = await Term.destroy({
    where: { termId: id },
  });

  if (academicYear === null)
    return res.status(404).send(`AcademicYear with id ${id} not found`);

  res.send("deleted AcademicYear");
};

module.exports = {
  createTerm,
  getTerms,
  getTermById,
  updateTerm,
  deleteTerm,
};
