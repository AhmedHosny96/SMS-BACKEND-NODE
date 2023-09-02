const { Op } = require("sequelize");
const model = require("../models/modelConfig");
const Driver = model.drivers;
const Vehicle = model.vehicles;
const School = model.school;
const Destination = model.destinations;

const createDriver = async (req, res) => {
  const { fullName, phoneNumber, licenceNumber, vehicleId, schoolId } =
    req.body;

  let driver = await Driver.findOne({
    where: {
      [Op.or]: [
        { phoneNumber: phoneNumber },
        { fullName: fullName },
        { licenceNumber: licenceNumber },
      ],
    },
  });
  if (driver)
    return res
      .status(400)
      .send({ status: 400, message: "Driver with the same record exists" });

  let payload = {
    fullName,
    phoneNumber,
    licenceNumber,
    vehicleId,
    schoolId,
  };
  await Driver.create(payload);
  res.send(payload);
};

const getDrivers = async (req, res) => {
  const driver = await Driver.findAll({
    // include: {
    //   model: Vehicle,
    //   as: "vehicle",
    //   attributes: [["plateNumber", ""]],
    // },
    include: "vehicle",
    raw: true,
  });
  res.send(driver);
};

const getDriverBySchool = async (req, res) => {
  let schoolId = req.params.schoolId;

  const driver = await Driver.findAll({
    where: { schoolId: schoolId },
    include: ["vehicle", School],
    raw: true,
  });

  res.send(driver);
};

const getDriverById = async (req, res) => {
  let id = req.params.id;

  const driver = await Driver.findOne({
    where: { id: id },
  });

  if (!driver)
    return res
      .status(404)
      .send({ status: 404, message: `driver with id ${id} not found` });

  res.send(driver);
};

const getDriverByVehicleId = async (req, res) => {
  let id = req.body;

  const driver = await Driver.findOne({
    where: { vehicleId: id },
  });

  if (!driver)
    return res
      .status(404)
      .send({ status: 404, message: `driver with id ${id} not found` });

  res.send(driver);
};

const updateDriver = async (req, res) => {
  let id = req.params.id;

  const driver = await Driver.update(req.body, {
    where: { id: id },
  });

  if (!driver)
    return res
      .status(404)
      .send({ status: 404, message: `driver with id ${id} not found` });

  res.status(200).send(driver);
};

const deleteDriver = async (req, res) => {
  let id = req.params.id;

  const driver = await Driver.destroy({
    where: { id: id },
  });

  if (!driver)
    return res
      .status(404)
      .send({ status: 404, message: `driver with id ${id} not found` });

  res.send("deleted driver");
};

module.exports = {
  createDriver,
  getDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
  getDriverByVehicleId,
  getDriverBySchool,
};
