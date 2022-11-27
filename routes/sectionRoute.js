const sectionController = require('../controllers/sectionController')

const router = require('express').Router();

router.get("/", sectionController.getSections)
router.get("/:id", sectionController.getSectionById)
router.post("/", sectionController.createSection)
router.put("/:id", sectionController.updateSection)
router.delete("/:id", sectionController.deleteSection)



module.exports = router;