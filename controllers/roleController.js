const model = require("../models/modelConfig");

const Role = model.roles;
const Permission = model.permissions;
const RolePermission = model.rolepermissions;
const School = model.school;

const createRole = async (req, res) => {
  const { role, description, schoolId, permissionIds } = req.body;

  let roles = await Role.findOne({
    where: {
      role: role,
    },
  });

  if (roles)
    return res
      .status(400)
      .send({ status: 400, message: "role already exists " });

  let payload = {
    role,
    description,
    schoolId,
  };

  const createdRole = await Role.create(payload);

  const permissions = await Permission.findAll({
    where: { id: permissionIds },
  });

  // Manually create the associations in the junction table (RolePermission)
  for (const permission of permissions) {
    const roleId = createdRole.dataValues.id;

    const permissionId = permission.id;

    const rolePermissionBody = { roleId, permissionId };

    await RolePermission.create(rolePermissionBody);
  }

  res.send(payload);
};

const getRole = async (req, res) => {
  const role = await Role.findAll({});
  res.send(role);
};

const getRolesBySchool = async (req, res) => {
  let schoolId = req.params.schoolId;

  const role = await Role.findAll({
    where: { schoolId: schoolId },
    include: [School],
    raw: true,
  });
  res.send(role);
};

const getRoleById = async (req, res) => {
  let id = req.params.id;

  const role = await Role.findOne({ where: { id: id } });

  if (!role)
    return res
      .status(404)
      .send({ status: 404, message: `role with id ${id} not found` });

  res.send(user);
};

const updateRole = async (req, res) => {
  let id = req.params.id;

  const role = await Role.update(req.body, { where: { id: id } });

  if (!role)
    return res
      .status(404)
      .send({ status: 404, message: `role with id ${id} not found` });

  res.status(200).send(role);
};

const deleteRole = async (req, res) => {
  let id = req.params.id;

  const role = await Role.destroy({ where: { id: id } });

  if (!role)
    return res
      .status(404)
      .send({ status: 404, message: `role with id ${id} not found` });

  res.send("deleted role");
};

module.exports = {
  createRole,
  getRole,
  getRoleById,
  updateRole,
  deleteRole,
  getRolesBySchool,
};
