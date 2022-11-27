const model = require("../models/modelConfig");

const LeaveRequest = model.leaveRequests;
const LeaveType = model.leaveTypes;
const Employee = model.employees;

const createLeaveRequest = async (req, res) => {
  const { leaveTypeId, employeeId, fromDate, toDate, remark, status } =
    req.body;

  //   let leaveRequest = await LeaveRequest.findOne({
  //     where: {
  //       type: type,
  //     },
  //   });

  //   if (leaveRequest)
  //     return res.status(400).send("leaveType with the same name exists");

  let payload = {
    leaveTypeId,
    employeeId,
    fromDate,
    toDate,
    remark,
  };

  await LeaveRequest.create(payload);

  res.send(payload);
};

const getLeaveRequests = async (req, res) => {
  const leaveRequest = await LeaveRequest.findAll({
    include: [Employee, LeaveType],
  });

  res.send(leaveRequest);
};

const getLeaveRequestById = async (req, res) => {
  let id = req.params.id;

  const leaveRequest = await LeaveRequest.findOne({
    where: { leaveRequestId: id },
  });

  if (leaveRequest === null)
    return res.status(404).send(`leaveRequest with id ${id} not found`);

  res.send(leaveRequest);
};

const updateLeaveRequest = async (req, res) => {
  let id = req.params.id;

  const leaveRequest = await LeaveRequest.update(req.body, {
    where: { leaveRequestId: id },
  });

  if (leaveRequest === null)
    return res.status(404).send(`leaveRequest with id ${id} not found`);

  res.status(200).send(leaveRequest);
};

const deleteLeaveRequest = async (req, res) => {
  let id = req.params.id;

  const leaveRequest = await LeaveRequest.destroy({
    where: { leaveRequestId: id },
  });

  if (leaveRequest === null)
    return res.status(404).send(`leaveRequest with id ${id} not found`);

  res.send("deleted leaveRequest");
};

module.exports = {
  createLeaveRequest,
  getLeaveRequests,
  getLeaveRequestById,
  updateLeaveRequest,
  deleteLeaveRequest,
};
