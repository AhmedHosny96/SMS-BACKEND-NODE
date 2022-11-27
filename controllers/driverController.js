const model = require("../models/modelConfig");

const Driver = model.drivers;
const Vehicle = model.vehicles;

const createDriver = async (req, res) => {
  const { fullName, phoneNumber, licenceNumber, dob, vehicleId } = req.body;

  let driver = await Driver.findOne({
    where: {
      phoneNumber: phoneNumber,
    },
  });

  if (driver) return res.status(400).send("asset with the same name exists");

  let payload = {
    fullName,
    phoneNumber,
    licenceNumber,
    dob,
    vehicleId,
  };
  await Driver.create(payload);
  res.send(payload);
};

const getDrivers = async (req, res) => {
  const driver = await Driver.findAll({ include: Vehicle });
  res.send(driver);
};

const getDriverById = async (req, res) => {
  let id = req.params.id;

  const driver = await Driver.findOne({
    where: { driverId: id },
  });

  if (driver === null)
    return res.status(404).send(`driver with id ${id} not found`);

  res.send(driver);
};

const updateDriver = async (req, res) => {
  let id = req.params.id;

  const driver = await Driver.update(req.body, {
    where: { driverId: id },
  });

  if (driver === null)
    return res.status(404).send(`vehicleId with id ${id} not found`);

  res.status(200).send(driver);
};

const deleteDriver = async (req, res) => {
  let id = req.params.id;

  const driver = await Driver.destroy({
    where: { driverId: id },
  });

  if (driver === null)
    return res.status(404).send(`driver with id ${id} not found`);

  res.send("deleted driver");
};

module.exports = {
  createDriver,
  getDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
};
