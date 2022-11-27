const model = require("../models/modelConfig");

const AcademicYear = model.academicYear;

const createAcademicYear = async (req, res) => {
  const { name, startDate, endDate, ethiopianYear } = req.body;

  let subject = await AcademicYear.findOne({
    where: {
      name: name,
    },
  });

  if (subject)
    return res.status(400).send("AcademicYear with the same name exists");

  let payload = {
    name,
    startDate,
    endDate,
    ethiopianYear,
  };
  await AcademicYear.create(payload);
  res.send(payload);
};

const getAcademicYears = async (req, res) => {
  const academicYear = await AcademicYear.findAll({});
  res.send(academicYear);
};

const getAcademicYearById = async (req, res) => {
  let id = req.params.id;

  const academicYear = await AcademicYear.findOne({
    where: { academicYearId: id },
  });

  if (academicYear === null)
    return res.status(404).send(`AcademicYear with id ${id} not found`);

  res.send(academicYear);
};

const updateAcademicYear = async (req, res) => {
  let id = req.params.id;

  const academicYear = await AcademicYear.update(req.body, {
    where: { id: id },
  });

  if (academicYear === null)
    return res.status(404).send(`AcademicYear with id ${id} not found`);

  res.status(200).send(academicYear);
};

const deleteAcademicYear = async (req, res) => {
  let id = req.params.id;

  const academicYear = await AcademicYear.destroy({
    where: { academicYearId: id },
  });

  if (academicYear === null)
    return res.status(404).send(`AcademicYear with id ${id} not found`);

  res.send("deleted AcademicYear");
};

module.exports = {
  createAcademicYear,
  getAcademicYears,
  getAcademicYearById,
  updateAcademicYear,
  deleteAcademicYear,
};
