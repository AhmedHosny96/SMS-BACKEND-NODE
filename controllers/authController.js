const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const model = require("../models/modelConfig");

const User = model.users;
const Role = model.roles;

const createUser = async (req, res) => {
  const { username, email, password, roleId } = req.body;

  let user = await User.findOne({
    where: {
      username: username,
    },
  });

  if (user) return res.status(400).send("username is taken ");

  let payload = {
    username,
    email,
    password: await bcrypt.hash(password, 10),
    roleId,
  };

  await User.create(payload);

  res.send(payload);
};

const login = async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({
    where: {
      email: email,
    },
    include: [Role],
  });

  const validPassword = await bcrypt.compare(password, user.password);

  console.log(validPassword);

  if (user == null || !validPassword)
    return res.status(400).send("invalid username or password ");

  //   console.log("USER", user);

  const token = jwt.sign(
    {
      username: user.username,
      email: email,
      roleId: user.role,
    },
    process.env.jwtSecret
  );

  res.header("x-auth-token", token).send(token);
};

module.exports = {
  createUser,
  login,
};
