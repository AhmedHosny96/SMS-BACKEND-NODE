const model = require("../models/modelConfig");
const { getDriverByVehicleId } = require("./driverController");
const { getVehicleById } = require("./vehicleController");

const School = model.school;

const Destination = model.destinations;

const createDestination = async (req, res) => {
  const { code, startPoint, stopPoint, schoolId } = req.body;

  let destination = await Destination.findOne({
    where: {
      code: code,
    },
  });

  if (destination)
    return res
      .status(400)
      .send({ status: 400, message: "destination with the same code exists" });

  let payload = {
    code,
    startPoint,
    stopPoint,
    schoolId,
    // vehicleId,
    // driverId: getDriverByVehicleId(vehicleId),
  };

  await Destination.create(payload);

  res.send(payload);
};

const getDestinations = async (req, res) => {
  const destination = await Destination.findAll({
    // include: [Vehicle, Driver],
    raw: true,
  });
  res.send(destination);
};

const getDestinationsBySchool = async (req, res) => {
  let schoolId = req.params.schoolId;

  const destination = await Destination.findAll({
    where: { schoolId: schoolId },
    include: [School],
    raw: true,
  });
  res.send(destination);
};

const getDestinationById = async (req, res) => {
  let id = req.params.id;

  const destination = await Destination.findOne({
    where: { id: id },
  });

  if (destination === null)
    return res
      .status(404)
      .send({ status: 404, message: `destination with id ${id} not found` });

  res.send(destination);
};

const updateDestination = async (req, res) => {
  let id = req.params.id;

  const destination = await Destination.update(req.body, {
    where: { id: id },
  });

  if (destination === null)
    return res.status(404).send(`destination with id ${id} not found`);

  res.status(200).send(destination);
};

const deleteDestination = async (req, res) => {
  let id = req.params.id;

  const destination = await Destination.destroy({
    where: { id: id },
  });

  if (destination === null)
    return res.status(404).send(`destination with id ${id} not found`);

  res.send("deleted destination");
};

module.exports = {
  createDestination,
  getDestinations,
  getDestinationById,
  updateDestination,
  deleteDestination,
  getDestinationsBySchool,
};
