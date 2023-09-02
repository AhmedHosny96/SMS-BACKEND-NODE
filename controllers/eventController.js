const model = require("../models/modelConfig");
const Event = model.events;
const School = model.school;

const createEvent = async (req, res) => {
  const { title, description, startDate, endDate, schoolId, status } = req.body;

  //   let driver = await Driver.findOne({
  //     where: {
  //       [Op.or]: [
  //         { phoneNumber: phoneNumber },
  //         { fullName: fullName },
  //         { licenceNumber: licenceNumber },
  //       ],
  //     },
  //   });
  //   if (driver)
  //     return res
  //       .status(400)
  //       .send({ status: 400, message: "Driver with the same record exists" });

  let payload = {
    title,
    description,
    startDate,
    endDate,
    schoolId,
    status,
  };

  await Event.create(payload);

  res.send(payload);
};

const getEvents = async (req, res) => {
  const driver = await Event.findAll({});
  res.send(driver);
};

const getEventBySchool = async (req, res) => {
  let schoolId = req.params.schoolId;

  const driver = await Event.findAll({
    where: { schoolId: schoolId },
    include: [School],
    raw: true,
  });
  res.send(driver);
};

const getEventById = async (req, res) => {
  let id = req.params.id;

  const driver = await Event.findOne({
    where: { id: id },
  });

  if (!driver)
    return res
      .status(404)
      .send({ status: 404, message: `event with id ${id} not found` });

  res.send(driver);
};

const updateEvent = async (req, res) => {
  let id = req.params.id;

  const existingEvent = await Event.findByPk(id);

  if (existingEvent.status === req.body.status) {
    return res.status(400).send({
      status: 400,
      message: `Event is already in ${req.body.status} status`,
    });
  }

  const event = await Event.update(req.body, {
    where: { id: id },
  });

  if (!event) return res.status(404).send(`event with id ${id} not found`);

  res.send({ status: 200, message: "Event status updated successfully!" });
};

const deleteEventById = async (req, res) => {
  let id = req.params.id;

  const driver = await Event.destroy({
    where: { id: id },
  });

  if (!driver) return res.status(404).send(`event with id ${id} not found`);

  res.send("deleted events");
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEventById,
  getEventBySchool,
};
