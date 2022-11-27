const model = require("../models/modelConfig");

const Section = model.sections;
const Class = model.classes;

const createSection = async (req, res) => {
  const { name, maximumStudents, classId } = req.body;

  let section = await Section.findOne({
    where: {
      name: name,
    },
  });

  if (section) return res.status(400).send("section with the same name exists");

  let payload = {
    name,
    maximumStudents,
    classId,
  };

  await Section.create(payload);

  res.send(payload);
};

const getSections = async (req, res) => {
  const sections = await Section.findAll({ include: Class });

  res.send(sections);
};

const getSectionById = async (req, res) => {
  let id = req.params.id;

  const section = await Section.findOne({ where: { sectionId: id } });

  if (section === null)
    return res.status(404).send(`section with id ${id} not found`);

  res.send(section);
};

const updateSection = async (req, res) => {
  let id = req.params.id;

  const section = await Section.update(req.body, { where: { sectionId: id } });

  if (section === null)
    return res.status(404).send(`section with id ${id} not found`);

  res.status(200).send(section);
};

const deleteSection = async (req, res) => {
  let id = req.params.id;

  const section = await Section.destroy({ where: { sectionId: id } });

  if (section === null)
    return res.status(404).send(`subject with id ${id} not found`);

  res.send("deleted subject");
};

module.exports = {
  createSection,
  getSections,
  getSectionById,
  updateSection,
  deleteSection,
};
