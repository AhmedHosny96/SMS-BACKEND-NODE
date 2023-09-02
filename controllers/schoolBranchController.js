const model = require("../models/modelConfig");

const Branch = model.schoolBranch;
const School = model.school;

const createBranch = async (req, res) => {
  const { name, city, contactEmail, phoneNumber, address, schoolId } = req.body;

  let branch = await Branch.findOne({
    where: {
      name: name,
      // code: code,
    },
  });

  if (branch)
    return res
      .status(400)
      .send({ status: 400, message: `branch with the same name exists` });

  let payload = {
    name,
    city,
    contactEmail,
    phoneNumber,
    address,
    schoolId,
  };

  await Branch.create(payload);

  res.send(payload);
};

const getBranches = async (req, res) => {
  const branches = await Branch.findAll({ include: [School], raw: true });

  res.send(branches);
};

const getBranchById = async (req, res) => {
  let id = req.params.id;

  let branch = await Branch.findOne({ where: { id: id } });

  if (!branch)
    return res
      .status(404)
      .send({ status: 404, message: `branch with id ${id} not found` });

  res.send(branch);
};

const updateBranch = async (req, res) => {
  let id = req.params.id;

  let branch = await Branch.update(req.body, { where: { id: id } });

  if (!branch)
    return res
      .status(404)
      .send({ status: 404, message: `branch with id ${id} not found` });

  res.status(200).send(branch);
};

const deleteBranch = async (req, res) => {
  let id = req.params.id;

  const branch = await Branch.destroy({ where: { id: id } });

  if (!branch)
    return res
      .status(404)
      .send({ status: 404, message: `branch with id ${id} not found` });

  res.send("deleted branch");
};

module.exports = {
  createBranch,
  getBranches,
  getBranchById,
  updateBranch,
  deleteBranch,
};
