const router = require("express").Router();
const auth = require("../middlewares/auth");
const Class = require("../models/class");

// find all
router.get("/", async (req, res) => {
  Class.findAll((err, data) => {
    if (err) return res.status(500).send(err.message);

    res.send(data);
  });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  Class.findById(id, (err, data) => {
    if (err) return res.status(500).send(err.message);

    res.send(data);
  });
});

router.post("/", async (req, res) => {
  const { classId, name, description } = req.body;

  if (!req.body) return res.status(400).send("body cannot be empty");

  const values = new Class({
    classId,
    name,
    description,
  });

  Class.create(values, (err, data) => {
    if (err) return res.status(500).send(err.message);

    res.send(data);
  });
});

//update

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  Class.findByIdAndUpdate(id, new Class(req.body), (err, data) => {
    if (err) {
      err.kind === "not_found"
        ? res.status(400).send({ message: "class not found with id " + id })
        : res.status(500).json(err.message);
    }

    res.send(data);
  });
});

// delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  Class.findByIdAndDelete(id, (err, data) => {
    if (err) {
      err.kind === "not_found"
        ? res.status(400).send("class not found with id " + id)
        : res.status(500).json(err.message);
    }

    res.send("deleted successfully");
  });
});

module.exports = router;
