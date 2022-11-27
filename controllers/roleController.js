const model = require("../models/modelConfig");

const Role = model.roles;

const createRole = async (req, res) => {
  const { role } = req.body;

  let roles = await Role.findOne({
    where: {
      role: role,
    },
  });

  if (roles) return res.status(400).send("role already exists ");

  let payload = {
    role,
  };

  await Role.create(payload);

  res.send(payload);
};

const getRole = async (req, res) => {
  const role = await Role.findAll({});

  res.send(role);
};

const getRoleById = async (req, res) => {
  let id = req.params.id;

  const role = await Role.findOne({ where: { roleId: id } });

  if (role === null)
    return res.status(404).send(`role with id ${id} not found`);

  res.send(user);
};

const updateRole = async (req, res) => {
  let id = req.params.id;

  const role = await Role.update(req.body, { where: { roleId: id } });

  if (role === null)
    return res.status(404).send(`role with id ${id} not found`);

  res.status(200).send(role);
};

const deleteRole = async (req, res) => {
  let id = req.params.id;

  const role = await Role.destroy({ where: { roleId: id } });

  if (role === null)
    return res.status(404).send(`role with id ${id} not found`);

  res.send("deleted role");
};

module.exports = {
  createRole,
  getRole,
  getRoleById,
  updateRole,
  deleteRole,
};
