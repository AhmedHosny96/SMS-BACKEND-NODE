const model = require("../models/modelConfig");

const Vehicle = model.vehicles;

const createAsset = async (req, res) => {
  const {
    type,
    ownerName,
    ownerPhoneNumber,
    plateNumber,
    noOfSeats,
    rentedAmount,
  } = req.body;

  let vehicle = await Vehicle.findOne({
    where: {
      ownerPhoneNumber: ownerPhoneNumber,
    },
  });

  if (vehicle) return res.status(400).send("asset with the same name exists");

  let payload = {
    type,
    ownerName,
    ownerPhoneNumber,
    plateNumber,
    noOfSeats,
    rentedAmount,
  };
  await Vehicle.create(payload);
  res.send(payload);
};

const getVehicles = async (req, res) => {
  const vehicle = await Vehicle.findAll({});
  res.send(vehicle);
};

const getVehicleById = async (req, res) => {
  let id = req.params.id;

  const vehicle = await Vehicle.findOne({
    where: { vehicleId: id },
  });

  if (vehicle === null)
    return res.status(404).send(`vehicle with id ${id} not found`);

  res.send(vehicle);
};

const updateVehicle = async (req, res) => {
  let id = req.params.id;

  const vehicle = await Vehicle.update(req.body, {
    where: { vehicleId: id },
  });

  if (vehicle === null)
    return res.status(404).send(`vehicleId with id ${id} not found`);

  res.status(200).send(vehicle);
};

const deleteVehicle = async (req, res) => {
  let id = req.params.id;

  const vehicle = await Vehicle.destroy({
    where: { vehicleId: id },
  });

  if (vehicle === null)
    return res.status(404).send(`vehicle with id ${id} not found`);

  res.send("deleted vehicle");
};

module.exports = {
  createAsset,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};
