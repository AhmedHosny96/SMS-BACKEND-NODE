// const router = require("express").Router();
// const multer = require("multer");
// const path = require("path");
// const Note = require("../models/note");

// // multer config for file upload

// const uploadStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join("./uploads/"));
//   },
//   filename: (req, file, cb) => {
//     cb(null, req.body.title + file.originalname);
//   },
// });

const noteController = require("../controllers/noteController");

const router = require("express").Router();

router.get("/", noteController.getNotes);
router.get("/:id", noteController.getNoteById);
router.post("/", noteController.createNote);
router.put("/:id", noteController.updateNote);
router.delete("/:id", noteController.deleteNote);

module.exports = router;
