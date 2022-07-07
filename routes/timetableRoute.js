const router = require("express").Router();
const Timetable = require("../models/timetable");

// get all
router.get("/", async (req, res) => {
  if (!req.body) return res.status(400).send("Content cannot be empty");

  Timetable.findAll((err, data) => {
    if (err) return res.status(500).send(err.messsage);

    res.send(data);
  });
});

// get by id

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  Timetable.findById(id, (err, data) => {
    if (err) {
      res.send(err.message);
    }

    if (data.length === 0)
      return res.status(400).send("timetable not found with " + id);
    res.send(data);
  });
});

// GET TIME TABLE BY SECTION

router.get("/", async (req, res) => {
  var sectionId = req.query.sectionId;
  console.log(req.query);
  Timetable.findBySection(sectionId, (err, data) => {
    if (err) {
      res.send(err.message);
    }

    if (data.length === 0)
      return res.status(400).send("timetable not found with section id " + id);
    res.send(data);
  });
});

// create status
router.post("/", async (req, res) => {
  //   // validation
  if (!req.body)
    return res.status(400).send({ message: "Content can't be empty" });

  const { day, periodId, classId, sectionId, subjectId } = req.body;

  //
  const timetable = new Timetable({
    day,
    periodId,
    classId,
    sectionId,
    subjectId,
  });

  Timetable.create(timetable, (err, data) => {
    // if (err && err.code == "ER_DUP_ENTRY")
    //   return res.status(400).send("record already exists");

    if (err) return res.status(400).send(err.message);

    res.send(data);
  });
});

//update
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  Timetable.findByIdAndUpdate(id, new Timetable(req.body), (err, data) => {
    if (err) {
      err.kind === "not_found"
        ? res.status(400).send({ message: "timetable not found with id " + id })
        : res.status(500).json(err.message);
    }

    res.send(data);
  });
});

// delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  Timetable.findByidAndDelete(id, (err, data) => {
    if (err) {
      err.kind === "not_found"
        ? res.status(400).send("timetable not found with id " + id)
        : res.status(500).json(err.message);
    }

    res.send("deleted successfully");
  });
});

module.exports = router;
