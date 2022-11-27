const model = require("../models/modelConfig");

const Period = model.shifts;

const createShift = async (req, res) => {
  const { name, startTime, endTime } = req.body;

  let shift = await Period.findOne({
    where: {
      name: name,
    },
  });

  if (shift) return res.status(400).send("shift with the same name exists");

  let payload = {
    name,
    startTime,
    endTime,
  };

  await Period.create(payload);

  res.send(payload);
};

const getShifs = async (req, res) => {
  const shift = await Period.findAll({});

  res.send(shift);
};

const getShiftById = async (req, res) => {
  let id = req.params.id;

  const shift = await Period.findOne({ where: { id: id } });

  if (shift === null)
    return res.status(404).send(`shift with id ${id} not found`);

  res.send(shift);
};

const updateShift = async (req, res) => {
  let id = req.params.id;

  const shift = await Period.update(req.body, { where: { id: id } });

  if (shift === null)
    return res.status(404).send(`shift with id ${id} not found`);

  res.status(200).send(shift);
};

const deleteShift = async (req, res) => {
  let id = req.params.id;

  const shift = await Period.destroy({ where: { id: id } });

  if (shift === null)
    return res.status(404).send(`shift with id ${id} not found`);

  res.send("deleted period");
};

module.exports = {
  createShift,
  getShifs,
  getShiftById,
  updateShift,
  deleteShift,
};
