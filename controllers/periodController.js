const model = require("../models/modelConfig");

const Period = model.periods;

const createPeriod = async (req, res) => {
  const { name, startTime, endTime } = req.body;

  let period = await Period.findOne({
    where: {
      name: name,
    },
  });

  if (period) return res.status(400).send("period with the same name exists");

  let payload = {
    name,
    startTime,
    endTime,
  };

  await Period.create(payload);

  res.send(payload);
};

const getPeriods = async (req, res) => {
  const periods = await Period.findAll({});

  res.send(periods);
};

const getPeriodById = async (req, res) => {
  let id = req.params.id;

  const period = await Period.findOne({ where: { id: id } });

  if (period === null)
    return res.status(404).send(`period with id ${id} not found`);

  res.send(period);
};

const updatePeriod = async (req, res) => {
  let id = req.params.id;

  const period = await Period.update(req.body, { where: { id: id } });

  if (period === null)
    return res.status(404).send(`period with id ${id} not found`);

  res.status(200).send(period);
};

const deletePeriod = async (req, res) => {
  let id = req.params.id;

  const period = await Period.destroy({ where: { id: id } });

  if (period === null)
    return res.status(404).send(`period with id ${id} not found`);

  res.send("deleted period");
};

module.exports = {
  createPeriod,
  getPeriods,
  getPeriodById,
  updatePeriod,
  deletePeriod,
};
