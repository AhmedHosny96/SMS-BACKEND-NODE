const router = require("express").Router();

const AcademicYear = require("../models/academicYear");

// find all
router.get("/", async (req, res) => {
  AcademicYear.findAll((err, data) => {
    if (err) return res.status(500).send(err.message);

    res.send(data);
  });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  AcademicYear.findById(id, (data) => {
    if (data.length == 0)
      return res.status(400).send("session not found with id " + id);

    res.send(data);
  });
});

router.post("/", async (req, res) => {
  const { name, startDate, endDate, ethiopianYear } = req.body;

  if (!req.body) return res.status(400).send("body cannot be empty");

  const values = new AcademicYear({
    name,
    startDate,
    endDate,
    ethiopianYear,
  });

  AcademicYear.create(values, (err, data) => {
    // if (err?.code == "ER_DUP_ENTRY")
    //   return res.status(400).send("record already exists");

    if (err) return res.status(500).send(err.message);
    res.send(data);
  });
});

//update

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  AcademicYear.findByIdAndUpdate(
    id,
    new AcademicYear(req.body),
    (err, data) => {
      if (err && err.kind === "not_found")
        return res.status(400).send("academicYear not found with id " + id);

      res.send(data);
    }
  );
});

// delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  AcademicYear.findByIdAndDelete(id, (err) => {
    if (err?.kind == "not_found")
      return res.status(400).send("subject not found with id " + id);

    res.send("deleted successfully");
  });
});

module.exports = router;
