const router = require("express").Router();
const Auth = require("../models/auth");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//sign up
router.post("/create", async (req, res) => {
  const { username, email, password, roleId } = req.body;
  if (!req.body) return res.status(500).send("Content cannot be empty");

  const user = new User({
    username,
    email,
    password: await bcrypt.hash(password, 10),
    roleId,
  });

  Auth.create(user, (err, data) => {
    if (err) return res.status(500).send(err.message);

    const { password, ...others } = data;

    res.send(others);
  });
});

// login

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne(email, async (err, data) => {
    if (err) return res.status(500).send(err.message);
    // validation

    if (data.length === 0)
      return res.status(400).send("Invalid username or password");

    // console.log(data[0]);

    const { user_id, username, email, password: dbPassword } = data[0];

    const validPassword = await bcrypt.compare(password, dbPassword);

    if (!validPassword)
      return res.status(401).send("Invalid username or password");

    // token
    const token = jwt.sign(
      { id: user_id, username: username, email: email },
      process.env.jwtSecret
    );

    // send email

    // const { password, ...others } = data;

    res.header("x-auth-token", token).send(token);
  });
});

// resset password

module.exports = router;
