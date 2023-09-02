const model = require("../models/modelConfig");

const Assesment = model.assesments;
const Class = model.classes;
const Section = model.sections;
const Subject = model.subjects;

const createAssesment = async (req, res) => {
  const { name, maxMarks, classId } = req.body;

  let assesment = await Assesment.findOne({
    where: {
      name: name,
    },
  });

  if (assesment) return res.status(400).send("asset with the same name exists");

  let payload = {
    name,
    classId,
    maxMarks,
    id,
    id,
  };
  await Assesment.create(payload);
  res.send(payload);
};

const getAssesments = async (req, res) => {
  const asset = await Assesment.findAll({
    include: [Class, Section, Subject],
    raw: true,
  });
  res.send(asset);
};

const getAssesmentById = async (req, res) => {
  let id = req.params.id;

  const assesment = await Assesment.findOne({
    where: { assesmentId: id },
  });

  if (assesment === null)
    return res.status(404).send(`assesment with id ${id} not found`);

  res.send(asset);
};

const updateAssesment = async (req, res) => {
  let id = req.params.id;

  const assesment = await Assesment.update(req.body, {
    where: { assesmentId: id },
  });

  if (assesment === null)
    return res.status(404).send(`assesment with id ${id} not found`);

  res.status(200).send(assesment);
};

const deleteAssesment = async (req, res) => {
  let id = req.params.id;

  const assesment = await Assesment.destroy({
    where: { assesmentId: id },
  });

  if (asset === null)
    return res.status(404).send(`assesment with id ${id} not found`);

  res.send("deleted assesment");
};

module.exports = {
  createAssesment,
  getAssesments,
  getAssesmentById,
  updateAssesment,
  deleteAssesment,
};
