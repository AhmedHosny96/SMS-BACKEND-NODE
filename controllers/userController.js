const bcryp = require("bcrypt");
const model = require("../models/modelConfig");

const User = model.users;
const Role = model.roles;

// const createUser = async (req, res) => {
//   const { username, email, password, roleId } = req.body;

//   let user = await User.findOne({
//     where: {
//       username: username,
//     },
//   });

//   if (user) return res.status(400).send("username is taken ");

//   let payload = {
//     username,
//     email,
//     password,
//     roleId,
//   };

//   await User.create(payload);

//   res.send(payload);
// };

const getUser = async (req, res) => {
  const user = await User.findAll({ include: Role });

  res.send(user);
};

const getUserById = async (req, res) => {
  let id = req.params.id;

  const user = await User.findOne({ where: { userId: id } });

  if (user === null)
    return res.status(404).send(`user with id ${id} not found`);

  res.send(user);
};

const updateUser = async (req, res) => {
  let id = req.params.id;

  const user = await User.update(req.body, { where: { userId: id } });

  if (user === null)
    return res.status(404).send(`user with id ${id} not found`);

  res.status(200).send(user);
};

const deleteUser = async (req, res) => {
  let id = req.params.id;

  const user = await User.destroy({ where: { userId: id } });

  if (user === null)
    return res.status(404).send(`user with id ${id} not found`);

  res.send("deleted user");
};

module.exports = {
  getUser,
  getUserById,
  updateUser,
  deleteUser,
};
