const model = require("../models/modelConfig");

const Class = model.classes;

const createClass = async (req, res) => {
  const { name, description } = req.body;

  let subject = await Class.findOne({
    where: {
      name: name,
    },
  });

  if (subject) return res.status(400).send("class with the same name exists");

  let payload = {
    name,
    description,
  };

  await Class.create(payload);

  res.send(payload);
};

const getClasses = async (req, res) => {
  const subjects = await Class.findAll({});

  res.send(subjects);
};

const getClassById = async (req, res) => {
  let id = req.params.id;

  const subject = await Class.findOne({ where: { id: id } });

  if (subject === null)
    return res.status(404).send(`class with id ${id} not found`);

  res.send(subject);
};

const updateClass = async (req, res) => {
  let id = req.params.id;

  const subject = await Class.update(req.body, { where: { id: id } });

  if (subject === null)
    return res.status(404).send(`class with id ${id} not found`);

  res.status(200).send(subject);
};

const deleteClass = async (req, res) => {
  let id = req.params.id;

  const subject = await Class.destroy({ where: { id: id } });

  if (subject === null)
    return res.status(404).send(`class with id ${id} not found`);

  res.send("deleted class");
};

module.exports = {
  createClass,
  getClasses,
  getClassById,
  updateClass,
  deleteClass,
};
