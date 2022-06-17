const router = require("express").Router();
const Leave = require("../models/leave");

// get all
router.get("/", async (req, res) => {
  if (!req.body) return res.status(400).send("Content cannot be empty");

  Leave.findAll((err, data) => {
    if (err) return res.status(500).send(err.messsage);

    res.send(data);
  });
});

// get by id

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  Leave.findById(id, (err, data) => {
    if (err) return res.status(500).send(err.message);

    if (data.length === 0)
      return res.status(400).send("leave not found with " + id);

    res.send(data);
  });
});
// create status
router.post("/", async (req, res) => {
  const {
    employeeId,
    leaveTypeId,
    fromDate,
    toDate,
    remark,
    status,
    approvedBy,
  } = req.body;
  //   // validation
  if (!req.body)
    return res.status(400).send({ message: "Content can't be empty" });

  //
  const event = new Leave({
    employeeId,
    leaveTypeId,
    fromDate,
    toDate,
    remark,
    status,
    approvedBy,
  });
  Leave.create(event, (err, data) => {
    if (err) return res.status(500).send(err.message);
    res.send(data);
  });
});

//update

router.put("/:id", async (req, res) => {
  const {
    employeeId,
    leaveTypeId,
    fromDate,
    toDate,
    remark,
    status,
    approvedBy,
  } = req.body;

  // validation

  if (!req.body) return res.status(400).send("body cannot be empty");
  const { id } = req.params;
  Leave.findByIdAndUpdate(
    id,
    new Leave({
      employeeId,
      leaveTypeId,
      fromDate,
      toDate,
      remark,
      status,
      approvedBy,
    }),
    (err, data) => {
      if (err) {
        err.kind === "not_found"
          ? res.status(400).send({ message: "leave not found with id " + id })
          : res.status(500).json(err.message);
      }

      res.send(data);
    }
  );
});

// delete
router.delete("/:id", async (req, res) => {
  Leave.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      err.kind === "not_found"
        ? res.status(400).send("leave not found with id " + req.params.id)
        : res.status(500).json(err.message);
    }

    res.send("deleted successfully");
  });
});

module.exports = router;
