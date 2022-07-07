const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const Note = require("../models/note");

// multer config for file upload

const uploadStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join("./uploads/"));
  },
  filename: (req, file, cb) => {
    cb(null, req.body.title + file.originalname);
  },
});

// multer storage

const uploads = multer({
  storage: uploadStorage,
  limits: {
    fieldSize: 1024 * 1024 * 10,
  },
});

// get all
router.get("/", async (req, res) => {
  if (!req.body) return res.status(400).send("Content cannot be empty");

  Note.findAll((err, data) => {
    if (err) return res.status(500).send(err.messsage);

    res.send(data);
  });
});

// get by id

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  Note.findById(id, (err, data) => {
    if (err) {
      res.send(err.message);
    }

    if (data.length === 0)
      return res.status(400).send("note not found with " + id);
    res.send(data);
  });
});

// create status
router.post("/", uploads.single("attachment"), async (req, res) => {
  //   // validation
  if (!req.body)
    return res.status(400).send({ message: "Content can't be empty" });

  const { title, description, classId, sectionId, subjectId } = req.body;

  //
  const status = new Note({
    title,
    description,
    attachment: req.file.filename,
    classId,
    sectionId,
    subjectId,
  });

  Note.create(status, (err, data) => {
    if (err && err.code == "ER_DUP_ENTRY")
      return res.status(400).send("record already exists");
    res.send(data);
  });
});

//update
router.put("/:id", uploads.single("attachment"), async (req, res) => {
  const { id } = req.params;
  const { title, description, classId, sectionId, subjectId } = req.body;
  Note.findByIdAndUpdate(
    id,
    new Note({
      title,
      description,
      attachment: req.file.filename,
      classId,
      sectionId,
      subjectId,
    }),
    (err, data) => {
      if (err) {
        err.kind === "not_found"
          ? res.status(400).send({ message: "note not found with id " + id })
          : res.status(500).json(err.message);
      }

      res.send(data);
    }
  );
});

// delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  Note.findByidAndDelete(id, (err, data) => {
    if (err) {
      err.kind === "not_found"
        ? res.status(400).send("note not found with id " + id)
        : res.status(500).json(err.message);
    }

    res.send("deleted successfully");
  });
});

module.exports = router;
