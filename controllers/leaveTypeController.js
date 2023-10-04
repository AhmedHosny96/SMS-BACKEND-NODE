const model = require("../models/modelConfig");

const LeaveType = model.leaveTypes;
const School = model.school;

const createLeaveType = async (req, res) => {
  const { type, allowedDays, description, schoolId } = req.body;

  const leaveType = await LeaveType.findOne({
    where: {
      [Op.and]: [
        {
          type: type, // Check for the same name
        },
        {
          schoolId: schoolId, // Check for the same schoolId
        },
      ],
    },
  });

  if (leaveType)
    return res.status(400).send("leaveType with the same name exists");

  let payload = {
    type,
    allowedDays,
    description,
    schoolId,
  };

  await LeaveType.create(payload);

  res.send(payload);
};

const getLeaveTypes = async (req, res) => {
  const leaveTypes = await LeaveType.findAll({});

  res.send(leaveTypes);
};

const getLeaveTypesSchool = async (req, res) => {
  let schoolId = req.params.schoolId;

  const leaveTypes = await LeaveType.findAll({
    where: { schoolId: schoolId },
    include: [School],
    raw: true,
  });

  res.send(leaveTypes);
};

const getLeaveTypeById = async (req, res) => {
  let id = req.params.id;

  const leaveType = await LeaveType.findOne({ where: { id: id } });

  if (!leaveType)
    return res
      .status(404)
      .send({ status: 404, message: `leaveType with id ${id} not found` });

  res.send(leaveType);
};

const updateLeaveType = async (req, res) => {
  let id = req.params.id;

  const leaveType = await LeaveType.update(req.body, {
    where: { id: id },
  });

  if (!leaveType)
    return res
      .status(404)
      .send({ status: 404, message: `leaveType with id ${id} not found` });

  res.status(200).send(leaveType);
};

const deleteLeaveType = async (req, res) => {
  let id = req.params.id;

  const leaveType = await LeaveType.destroy({ where: { leaveTypeId: id } });

  if (!leaveType)
    return res
      .status(404)
      .send({ status: 404, message: `leaveType with id ${id} not found` });

  res.send("deleted leaveType");
};

module.exports = {
  createLeaveType,
  getLeaveTypes,
  getLeaveTypeById,
  updateLeaveType,
  deleteLeaveType,
  getLeaveTypesSchool,
};
