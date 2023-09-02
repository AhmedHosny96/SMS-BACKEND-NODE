const model = require("../models/modelConfig");

const Title = model.jobtitles;

const createTitle = async (req, res) => {
  const { title, description } = req.body;

  let titles = await Title.findOne({
    where: {
      title: title,
    },
  });

  if (titles) return res.status(400).send("Title with the same name exists");

  let payload = {
    title,
    description,
  };

  await Title.create(payload);

  res.send(payload);
};

const getTitles = async (req, res) => {
  const titles = await Title.findAll({});

  res.send(titles);
};

const getTitleById = async (req, res) => {
  let id = req.params.id;

  const titles = await Title.findOne({ where: { titleId: id } });

  if (titles === null)
    return res.status(404).send(`Title with id ${id} not found`);

  res.send(titles);
};

const updateTitle = async (req, res) => {
  let id = req.params.id;

  const titles = await Title.update(req.body, {
    where: { titleId: id },
  });

  if (titles === null)
    return res.status(404).send(`Title with id ${id} not found`);

  res.status(200).send(titles);
};

const deleteTitle = async (req, res) => {
  let id = req.params.id;

  const titles = await Title.destroy({ where: { titleId: id } });

  if (titles === null)
    return res.status(404).send(`Title with id ${id} not found`);

  res.send("deleted Title");
};

module.exports = {
  createTitle,
  getTitles,
  getTitleById,
  updateTitle,
  deleteTitle,
};
