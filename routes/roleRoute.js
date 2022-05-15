const router = require("express").Router();
const Role = require("../models/role");

// get all
router.get("/", async (req, res) => {
  if (!req.body) return res.status(400).send("Content cannot be empty");

  Role.findAll((err, data) => {
    if (err) return res.status(500).send(err.messsage);

    res.send(data);
  });
});

// get by id

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  Role.findById(id, (err, data) => {
    if (err) {
      //   err.kind === "not_found"
      //     ? res.status(400).send("status not found with id " + id)
      res.send(err.message);
    }

    if (data.length === 0)
      return res.status(400).send("role not found with " + id);
    res.send(data);
  });
});
// create status
router.post("/", async (req, res) => {
  //   // validation
  if (!req.body)
    return res.status(400).send({ message: "Content can't be empty" });

  //

  const role = new Role({
    name: req.body.name,
  });
  Role.create(role, (err, data) => {
    if (err) return res.status(500).send(err.message);

    res.send(data);
  });
});

//update

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  Role.findByIdAndUpdate(id, new Role(req.body), (err, data) => {
    if (err) {
      err.kind === "not_found"
        ? res.status(400).send({ message: "role not found with id " + id })
        : res.status(500).json(err.message);
    }

    res.send(data);
  });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  Role.findByidAndDelete(id, (err, data) => {
    if (err) {
      err.kind === "not_found"
        ? res.status(400).send("role not found with id " + id)
        : res.status(500).json(err.message);
    }

    res.send(data);
  });
});

module.exports = router;
