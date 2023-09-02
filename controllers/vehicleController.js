const model = require("../models/modelConfig");

const Vehicle = model.vehicles;
const School = model.school;

const createAsset = async (req, res) => {
  const {
    type,
    ownerName,
    ownerPhoneNumber,
    plateNumber,
    noOfSeats,
    rentedAmount,
    schoolId,
  } = req.body;

  let vehicle = await Vehicle.findOne({
    where: {
      plateNumber: plateNumber,
    },
  });

  if (vehicle)
    return res.status(400).send({
      status: 400,
      message: "vehicle with the same plate number exists",
    });

  let payload = {
    type,
    ownerName,
    ownerPhoneNumber,
    plateNumber,
    noOfSeats,
    rentedAmount,
    schoolId,
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
    where: { id: id },
  });

  if (!vehicle)
    return res
      .status(404)
      .send({ status: 404, message: `vehicle with id ${id} not found` });

  res.send(vehicle);
};

const getVehicleBySchool = async (req, res) => {
  let schoolId = req.params.schoolId;

  const vehicle = await Vehicle.findAll({
    where: { schoolId: schoolId },
    include: [School],
    raw: true,
  });
  res.send(vehicle);
};

const updateVehicle = async (req, res) => {
  let id = req.params.id;

  const vehicle = await Vehicle.update(req.body, {
    where: { vehicleId: id },
  });

  if (!vehicle)
    return res.status(404).send({
      status: 404,
      message: { status: 404, message: `vehicle with id ${id} not found` },
    });

  res.status(200).send(vehicle);
};

const deleteVehicle = async (req, res) => {
  let id = req.params.id;

  const vehicle = await Vehicle.destroy({
    where: { vehicleId: id },
  });

  if (!vehicle)
    return res
      .status(404)
      .send({ status: 404, message: `vehicle with id ${id} not found` });

  res.send("deleted vehicle");
};

module.exports = {
  createAsset,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
  getVehicleBySchool,
};
