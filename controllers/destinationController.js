const model = require("../models/modelConfig");

const Vehicle = model.vehicles;
const Driver = model.drivers;

const Destination = model.destinations;

const createDestination = async (req, res) => {
  const { code, startPoint, stopPoint, vehicleId, driverId } = req.body;

  let destination = await Destination.findOne({
    where: {
      code: code,
    },
  });

  if (destination)
    return res.status(400).send("destination with the same code exists");

  let payload = {
    code,
    startPoint,
    stopPoint,
    vehicleId,
    driverId,
  };

  await Destination.create(payload);

  res.send(payload);
};

const getDestinations = async (req, res) => {
  const destination = await Destination.findAll({ include: [Vehicle, Driver] });
  res.send(destination);
};

const getDestinationById = async (req, res) => {
  let id = req.params.id;

  const destination = await Destination.findOne({
    where: { destinationId: id },
  });

  if (destination === null)
    return res.status(404).send(`destination with id ${id} not found`);

  res.send(destination);
};

const updateDestination = async (req, res) => {
  let id = req.params.id;

  const destination = await Destination.update(req.body, {
    where: { destinationId: id },
  });

  if (destination === null)
    return res.status(404).send(`destination with id ${id} not found`);

  res.status(200).send(destination);
};

const deleteDestination = async (req, res) => {
  let id = req.params.id;

  const destination = await Destination.destroy({
    where: { destinationId: id },
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
};
