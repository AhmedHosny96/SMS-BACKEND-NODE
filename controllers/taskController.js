const model = require("../models/modelConfig");
const Task = model.tasks;
const School = model.school;

// const createTask = async (req, res) => {
//   const { task, description, dueDate, status, userId } = req.body;

//   let payload = {
//     task,
//     description,
//     dueDate,
//     status,
//     userId,
//   };

//   await Task.create(payload);

//   res.send(payload);
// };

const createTask = async (req, res) => {
  const { task, description, priority, schoolId, dueDate, status, userIds } =
    req.body;

  try {
    const createdTask = await Task.create({
      task,
      description,
      priority,
      schoolId,
      dueDate,
      status,
    });

    // Assign the task to the specified user IDs
    await Promise.all(userIds.map((userId) => createdTask.addUser(userId)));

    res.status(201).json({
      message: "Task created and assigned successfully",
      task: createdTask,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "An error occurred" });
  }
};

const getTasks = async (req, res) => {
  const driver = await Task.findAll({});
  res.send(driver);
};

const getTaskBySchool = async (req, res) => {
  let schoolId = req.params.schoolId;

  const driver = await Task.findAll({
    where: { schoolId: schoolId },
    include: [School],
    raw: true,
  });
  res.send(driver);
};

const getTaskById = async (req, res) => {
  let id = req.params.id;

  const driver = await Task.findOne({
    where: { id: id },
  });

  if (!driver)
    return res
      .status(404)
      .send({ status: 404, message: `event with id ${id} not found` });

  res.send(driver);
};

const updateTask = async (req, res) => {
  let id = req.params.id;

  const existingEvent = await Task.findByPk(id);

  if (existingEvent.status === req.body.status) {
    return res.status(400).send({
      status: 400,
      message: `Event is already in ${req.body.status} status`,
    });
  }

  const event = await Task.update(req.body, {
    where: { id: id },
  });

  if (!event) return res.status(404).send(`event with id ${id} not found`);

  res.send({ status: 200, message: "Event status updated successfully!" });
};

const deleteTask = async (req, res) => {
  let id = req.params.id;

  const driver = await Task.destroy({
    where: { driverId: id },
  });

  if (!driver) return res.status(404).send(`event with id ${id} not found`);

  res.send("deleted events");
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskBySchool,
};
