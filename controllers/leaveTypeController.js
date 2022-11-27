const model = require("../models/modelConfig");

const LeaveType = model.leaveTypes;

const createLeaveType = async (req, res) => {
  const { type, allowedDays } = req.body;

  let leaveType = await LeaveType.findOne({
    where: {
      type: type,
    },
  });

  if (leaveType)
    return res.status(400).send("leaveType with the same name exists");

  let payload = {
    type,
    allowedDays,
  };

  await LeaveType.create(payload);

  res.send(payload);
};

const getLeaveTypes = async (req, res) => {
  const leaveTypes = await LeaveType.findAll({});

  res.send(leaveTypes);
};

const getLeaveTypeById = async (req, res) => {
  let id = req.params.id;

  const leaveType = await LeaveType.findOne({ where: { leaveTypeId: id } });

  if (leaveType === null)
    return res.status(404).send(`leaveType with id ${id} not found`);

  res.send(leaveType);
};

const updateLeaveType = async (req, res) => {
  let id = req.params.id;

  const leaveType = await LeaveType.update(req.body, {
    where: { leaveTypeId: id },
  });

  if (leaveType === null)
    return res.status(404).send(`leaveType with id ${id} not found`);

  res.status(200).send(leaveType);
};

const deleteLeaveType = async (req, res) => {
  let id = req.params.id;

  const leaveType = await LeaveType.destroy({ where: { leaveTypeId: id } });

  if (leaveType === null)
    return res.status(404).send(`leaveType with id ${id} not found`);

  res.send("deleted leaveType");
};

module.exports = {
  createLeaveType,
  getLeaveTypes,
  getLeaveTypeById,
  updateLeaveType,
  deleteLeaveType,
};
