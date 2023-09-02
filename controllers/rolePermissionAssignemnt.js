const model = require("../models/modelConfig");

const Role = model.roles;

const Permission = model.permissions;

const assignRolesToPermissions = async (req, res) => {
  const { roleId, permissionIds } = req.body;

  const role = await Role.findByPk(roleId);
  const permissions = Permission.findAll({
    where: { id: permissionIds },
  });

  // Remove any existing permissions associated with the role
  await role.setPermissions([]);

  // Assign the new permissions to the Role
  await role.addPermissions(permissions);

  res
    .status(200)
    .json({ message: "Permissions assigned to the role successfully." });

  await Role.add;
};

module.exports = {
  assignRolesToPermissions,
};
