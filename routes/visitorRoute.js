const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const Visitor = require("../models/visitor");

// get all
router.get("/", async (req, res) => {
  try {
    if (!req.body) return res.status(400).send("Content cannot be empty");

    Visitor.findAll((err, data) => {
      if (err) return res.status(500).send(err.messsage);

      res.send(data);
    });
  } catch (error) {
    res.send(error);
  }
});

// get by id

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  Visitor.findById(id, (err, data) => {
    if (err) {
      res.send(err.message);
    }
    if (data.length === 0)
      return res.status(400).send("visitor not found with " + id);
    res.send(data);
  });
});

// create status
router.post("/", async (req, res) => {
  //   // validation
  if (!req.body)
    return res.status(400).send({ message: "Content can't be empty" });

  const { name, reason, date, toWhom, contact } = req.body;

  //
  const visitor = new Visitor({
    name,
    reason,
    date,
    toWhom,
    contact,
  });

  Visitor.create(visitor, (err, data) => {
    if (err) return res.status(400).send(err.message);
    res.send(data);
  });
});

//update
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  Visitor.findByIdAndUpdate(id, new Visitor(req.body), (err, data) => {
    if (err) {
      err.kind === "not_found"
        ? res.status(400).send({ message: "visitor not found with id " + id })
        : res.status(500).json(err.message);
    }

    res.send(data);
  });
});

// delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  Visitor.findByidAndDelete(id, (err, data) => {
    if (err) {
      err.kind === "not_found"
        ? res.status(400).send("visitor not found with id " + id)
        : res.status(500).json(err.message);
    }

    res.send("deleted successfully");
  });
});

module.exports = router;
