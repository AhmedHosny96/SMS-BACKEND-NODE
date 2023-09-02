const { Op } = require("sequelize");
const model = require("../models/modelConfig");

const Section = model.sections;
const Class = model.classes;
const School = model.school;

const createSection = async (req, res) => {
  const { name, classId, schoolId } = req.body;

  // let section = await Section.findOne({
  //   where: {
  //     name: name,
  //   },
  // });

  // if (section) return res.status(400).send("section with the same name exists");

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
};
