const { Op } = require("sequelize");
const model = require("../models/modelConfig");

const Section = model.sections;
const Class = model.classes;
const School = model.school;

const createSection = async (req, res) => {
  const { name, classId, schoolId } = req.body;

  const section = await Section.findOne({
    where: {
      [Op.and]: [
        {
          name: name, // Check for the same name
        },
        {
          schoolId: schoolId, // Check for the same schoolId
        },
        {
          classId: classId, // Check for the same schoolId
        },
      ],
    },
  });
  if (section)
    return res
      .status(400)
      .send({ status: 404, message: "section with the same name exists" });

  let payload = {
    name,
    classId,
    schoolId,
  };

  await Section.create(payload);

  res.send(payload);
};

const getSections = async (req, res) => {
  const sections = await Section.findAll({ include: Class, raw: true });

  res.send(sections);
};

const getSectionBySchool = async (req, res) => {
  let schoolId = req.params.schoolId;
  const sections = await Section.findAll({
    where: { schoolId: schoolId },
    include: [Class, School],
    raw: true,
  });

  res.send(sections);
};

const getSectionById = async (req, res) => {
  let id = req.params.id;

  const section = await Section.findOne({ where: { id: id } });

  if (section === null)
    return res.status(404).send(`section with id ${id} not found`);

  res.send(section);
};

const getSectionByClassId = async (req, res) => {
  let classId = req.params.classId;

  const section = await Section.findAll({
    where: { classId: classId },
    include: [Class],
    raw: true,
  });

  if (!section)
    return res
      .status(404)
      .send({ status: 200, message: `section with classId ${id} not found` });

  res.send(section);
};

const getSectionBySchoolAndClass = async (req, res) => {
  const { schoolId, classId } = req.params;

  const sections = await Section.findAll({
    where: { schoolId: schoolId, classId: classId },
    include: [Class], // If you want to include the associated Class model
    raw: true,
  });

  if (!sections || sections.length === 0) {
    return res.status(404).send({
      status: 404,
      message: `Sections not found in the selected class`,
    });
  }

  res.send(sections);
};

const updateSection = async (req, res) => {
  let id = req.params.id;

  const section = await Section.update(req.body, { where: { id: id } });

  if (section === null)
    return res.status(404).send(`section with id ${id} not found`);

  res.status(200).send(section);
};

const deleteSection = async (req, res) => {
  let id = req.params.id;

  const section = await Section.destroy({ where: { id: id } });

  if (section === null)
    return res.status(404).send(`subject with id ${id} not found`);

  res.send("deleted subject");
};

module.exports = {
  createSection,
  getSections,
  getSectionById,
  getSectionByClassId,
  updateSection,
  deleteSection,
  getSectionBySchool,
  getSectionBySchoolAndClass,
};
