const router = require("express").Router();
const User = require("../models/user");

// find all
router.get("/", async (req, res) => {
  User.findAll((err, data) => {
    if (err) return res.status(500).send(err.message);

    // const { password, ...others } = data;

    console.log(data);

    res.send(data);
  });
});

// find by id

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  User.findById(id, (err, data) => {
    if (err) return res.status(500).send(err.message);

    const { password, ...others } = data;

    res.send(others);
  });
});

module.exports = router;
