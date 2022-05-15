const router = require("express").Router();
const studentAttendance = require("../models/studentAttendance");

// get all
router.get("/", async (req, res) => {
  if (!req.body) return res.status(400).send("Content cannot be empty");

  studentAttendance.findAll((err, data) => {
    if (err) return res.status(500).send(err.messsage);

    res.send(data);
  });
});

// get by id

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  studentAttendance.findById(id, (err, data) => {
    if (err) return res.status(500).send(err.message);

    if (data.length === 0)
      return res.status(400).send("attendance not found with " + id);

    res.send(data);
  });
});
// create status
router.post("/", async (req, res) => {
  const { studentId, date, periodId, status } = req.body;
  //   // validation
  if (!req.body)
    return res.status(400).send({ message: "Content can't be empty" });

  //
  const attendance = new studentAttendance({
    studentId,
    date,
    status,
    periodId,
  });
  studentAttendance.create(attendance, (err, data) => {
    if (err?.code == "ER_DUP_ENTRY")
      return res.status(400).send("attendance record already exists");

    if (err) return res.status(500).send(err.message);

    res.send(data);
  });
});

//update

router.put("/:id", async (req, res) => {
  //   const { task, description, date, userId } = req.body;

  // validation

  if (!req.body) return res.status(400).send("body cannot be empty");
  const { id } = req.params;
  studentAttendance.findByIdAndUpdate(
    id,
    new studentAttendance(req.body),
    (err, data) => {
      if (err) {
        err.kind === "not_found"
          ? res
              .status(400)
              .send({ message: "attendance record not found with id " + id })
          : res.status(500).json(err.message);
      }

      res.send(data);
    }
  );
});

// delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  studentAttendance.findByIdAndDelete(id, (err, data) => {
    if (err) {
      err.kind === "not_found"
        ? res.status(400).send("attendance record not found with id " + id)
        : res.status(500).json(err.message);
    }

    res.send("deleted successfully");
  });
});

module.exports = router;
