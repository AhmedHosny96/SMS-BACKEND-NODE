const router = require("express").Router();
const LeaveType = require("../models/leaveType");

// get all
router.get("/", async (req, res) => {
  if (!req.body) return res.status(400).send("Content cannot be empty");

  LeaveType.findAll((err, data) => {
    if (err) return res.status(500).send(err.messsage);

    res.send(data);
  });
});

// get by id

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  LeaveType.findById(id, (err, data) => {
    if (data.length === 0)
      return res.status(400).send("leaveType not found with " + id);
    res.send(data);
  });
});
// create status
router.post("/", async (req, res) => {
  //   // validation
  if (!req.body)
    return res.status(400).send({ message: "Content can't be empty" });

  //
  const leaveType = new LeaveType({
    type: req.body.type,
    allowedDays: req.body.allowedDays,
  });
  LeaveType.create(leaveType, (err, data) => {
    if (err) return res.status(500).send(err.message);
    res.send(data);
  });
});

//update

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  LeaveType.findByIdAndUpdate(id, new LeaveType(req.body), (err, data) => {
    if (err) {
      err.kind === "not_found"
        ? res.status(400).send({ message: "leaveType not found with id " + id })
        : res.status(500).json(err.message);
    }

    res.send(data);
  });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  LeaveType.findByidAndDelete(id, (err, data) => {
    if (err) {
      err.kind === "not_found"
        ? res.status(400).send("leaveType not found with id " + id)
        : res.status(500).json(err.message);
    }

    res.send(data);
  });
});

module.exports = router;
