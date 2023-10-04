const { Op } = require("sequelize");
const model = require("../models/modelConfig");

const AcademicYear = model.academicYear;
const School = model.school;

const createAcademicYear = async (req, res) => {
  const { name, enrollmentType, startDate, endDate, ethiopianYear, schoolId } =
    req.body;

  const academicYear = await AcademicYear.findOne({
    where: {
      [Op.and]: [
        {
          name: name, // Check for the same name
        },
        {
          schoolId: schoolId, // Check for the same schoolId
        },
      ],
    },
  });
  if (academicYear)
    return res
      .status(400)
      .send({ status: 400, message: "session with the same name exists" });

  let payload = {
    name,
    enrollmentType,
    startDate,
    endDate,
    ethiopianYear,
    schoolId,
  };
  await AcademicYear.create(payload);
  res.send(payload);
};

const getAcademicYears = async (req, res) => {
  const academicYear = await AcademicYear.findAll({});
  res.send(academicYear);
};

const getAcademicYearBySchool = async (req, res) => {
  let schoolId = req.params.schoolId;
  const academicYear = await AcademicYear.findAll({
    where: { schoolId: schoolId },

    include: [School],
    raw: true,
  });
  res.send(academicYear);
};

const getAcademicYearById = async (req, res) => {
  let id = req.params.id;

  const academicYear = await AcademicYear.findOne({
    where: { id: id },
  });

  if (!academicYear)
    return res
      .status(404)
      .send({ status: 404, message: `session with id ${id} not found` });

  res.send(academicYear);
};

const updateAcademicYear = async (req, res) => {
  let id = req.params.id;

  const academicYear = await AcademicYear.update(req.body, {
    where: { id: id },
  });

  if (academicYear === null)
    return res.status(404).send(`session with id ${id} not found`);

  res.status(200).send(academicYear);
};

const deleteAcademicYear = async (req, res) => {
  let id = req.params.id;

  const academicYear = await AcademicYear.destroy({
    where: { academicYearId: id },
  });

  if (academicYear === null)
    return res.status(404).send(`session with id ${id} not found`);

  res.send("deleted session");
};

module.exports = {
  createAcademicYear,
  getAcademicYears,
  getAcademicYearById,
  updateAcademicYear,
  deleteAcademicYear,
  getAcademicYearBySchool,
};
