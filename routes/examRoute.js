const router = require("express").Router();
const multer = require("multer");
const Exam = require("../models/exam");

// get all
router.get("/", async (req, res) => {
  if (!req.body) return res.status(400).send("Content cannot be empty");

  Exam.findAll((err, data) => {
    if (err) return res.status(500).send(err.messsage);

    res.send(data);
  });
});

// get by id

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  Exam.findById(id, (err, data) => {
    if (err) {
      res.send(err.message);
    }

    if (data.length === 0)
      return res.status(400).send("exam not found with " + id);
    res.send(data);
  });
});

// create status
router.post("/", async (req, res) => {
  //   // validation
  if (!req.body)
    return res.status(400).send({ message: "Content can't be empty" });

  const {
    name,
    type,
    termId,
    academicId,
    maxMarks,
    passMarks,
    date,
    startTime,
    endTime,
    subjectId,
    sectionId,
    classId,
  } = req.body;

  //
  const status = new Exam({
    name,
    type,
    academicId,
    termId,
    maxMarks,
    passMarks,
    date,
    startTime,
    endTime,
    subjectId,
    sectionId,
    classId,
  });

  Exam.create(status, (err, data) => {
    if (err && err.code == "ER_DUP_ENTRY")
      return res.status(400).send("record already exists");
    if (err) return res.status(500).send(err.message);
    res.send(data);
  });
});

//update
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  Exam.findByIdAndUpdate(id, new Exam(req.body), (err, data) => {
    if (err) {
      err.kind === "not_found"
        ? res.status(400).send({ message: "exam not found with id " + id })
        : res.status(500).json(err.message);
    }

    res.send(data);
  });
});

// delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  Exam.findByidAndDelete(id, (err, data) => {
    if (err) {
      err.kind === "not_found"
        ? res.status(400).send("exam not found with id " + id)
        : res.status(500).json(err.message);
    }

    res.send("deleted successfully");
  });
});

module.exports = router;
