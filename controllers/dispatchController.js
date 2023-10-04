const model = require("../models/modelConfig");
const { sendMessage } = require("../utils/twilioConfig");

const emailSender = require("../utils/MailSender"); // const { getVehicleById } = require("./vehicleController");

const Destination = model.destinations;
const Driver = model.drivers;

const Dispatch = model.dispatches;

const Student = model.students;

const Parent = model.parents;

const School = model.school;

const createDispatch = async (req, res) => {
  const { driverId, destinationId, dispatchDate, schoolId } = req.body;

  try {
    // Check if a dispatch with the same driver and destination already exists
    const existingDispatch = await Dispatch.findOne({
      where: {
        driverId,
        destinationId,
        dispatchDate,
      },
    });



    // Await the result of the getStudentByDestinationId function

    if (existingDispatch) {
      return res.status(400).json({
        status: 400,
        message: "Dispatch already exists for this driver and destination.",
      });
    }
    // If no existing dispatch, create a new one
    const payload = {
      driverId,
      destinationId,
      dispatchDate,
      schoolId,
    };

    const newDispatch = await Dispatch.create(payload);
    // res.status(201).json(newDispatch);

    const students = await Student.findAll({
      where: { destinationId: destinationId },
      include: [Parent],
      raw: true,
    });

    console.log(students);

    for (const student of students) {
      // Access the parent's phone number for each student
      const parentPhoneNumber = student["parent.phoneNumber"];
      const email = student["parent.email"];

      const parentName = student["parent.fullName"];

      sendMessage(
        parentPhoneNumber,
        `Hi ${parentName} Your Students are dispatched from school at : ${dispatchDate}
        `
      );
      newDispatch.isParentNotified = true;

      await newDispatch.save();
    }
    res.status(201).json({ status: 200, message: "Dispatched successfully" });
  } catch (error) {
    console.error("Error creating dispatch:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the dispatch." });
  }
};

const getDispatches = async (req, res) => {
  const dispatch = await Dispatch.findAll({
    include: [Destination, Driver],
    raw: true,
  });
  res.send(dispatch);
};

const getDispatchesBySchool = async (req, res) => {
  let schoolId = req.params.schoolId;

  const dispatch = await Dispatch.findAll({
    where: { schoolId: schoolId },

    include: [Destination, Driver, School],
    raw: true,
  });
  res.send(dispatch);
};

const getDispatchesById = async (req, res) => {
  let id = req.params.id;

  const dispatch = await Dispatch.findOne({
    where: { id: id },
  });

  if (!dispatch)
    return res
      .status(404)
      .send({ status: 404, message: `dispatch with id ${id} not found` });

  res.send(dispatch);
};

const updateDispatch = async (req, res) => {
  let id = req.params.id;

  const dispatch = await Dispatch.update(req.body, {
    where: { id: id },
  });

  if (!dispatch)
    return res
      .status(404)
      .send({ status: 404, message: `dispatch with id ${id} not found` });

  res.status(200).send(dispatch);
};

const deleteDispatches = async (req, res) => {
  let id = req.params.id;

  const dispatch = await Dispatch.destroy({
    where: { id: id },
  });

  if (!dispatch)
    return res
      .status(404)
      .send({ status: 404, message: `dispatch with id ${id} not found` });

  res.send("deleted dispatch");
};

module.exports = {
  createDispatch,
  getDispatches,
  getDispatchesById,
  updateDispatch,
  deleteDispatches,
  getDispatchesBySchool,
};
