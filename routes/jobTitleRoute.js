const jobTitleController = require("../controllers/jobTitleController");

const router = require("express").Router();

router.get("/", jobTitleController.getTitles);
router.get("/:id", jobTitleController.getTitleById);
router.post("/", jobTitleController.createTitle);
router.put("/:id", jobTitleController.updateTitle);
router.delete("/:id", jobTitleController.deleteTitle);

module.exports = router;
