const model = require("../models/modelConfig");

const Visitor = model.visitor;

const createVisitor = async (req, res) => {
  const { fullName, phoneNumber, date, reason, toWhom } = req.body;

  //   let vehicle = await Vehicle.findOne({
  //     where: {
  //       ownerPhoneNumber: ownerPhoneNumber,
  //     },
  //   });

  //   if (vehicle) return res.status(400).send("asset with the same name exists");

  let payload = {
    fullName,
    phoneNumber,
    date,
    reason,
    toWhom,
  };
  await Visitor.create(payload);
  res.send(payload);
};

const getVisitors = async (req, res) => {
  const vehicle = await Visitor.findAll({});
  res.send(vehicle);
};

const getVisitorById = async (req, res) => {
  let id = req.params.id;

  const vehicle = await Visitor.findOne({
    where: { vehicleId: id },
  });

  if (vehicle === null)
    return res.status(404).send(`vehicle with id ${id} not found`);

  res.send(vehicle);
};

const updateVisitor = async (req, res) => {
  let id = req.params.id;

  const vehicle = await Visitor.update(req.body, {
    where: { vehicleId: id },
  });

  if (vehicle === null)
    return res.status(404).send(`vehicleId with id ${id} not found`);

  res.status(200).send(vehicle);
};

const deleteVisitor = async (req, res) => {
  let id = req.params.id;

  const vehicle = await Visitor.destroy({
    where: { vehicleId: id },
  });

  if (vehicle === null)
    return res.status(404).send(`vehicle with id ${id} not found`);

  res.send("deleted vehicle");
};

module.exports = {
  createVisitor,
  getVisitors,
  getVisitorById,
  updateVisitor,
  deleteVisitor,
};
