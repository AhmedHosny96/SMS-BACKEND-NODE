const subjectController = require('../controllers/subjectController')

const router = require('express').Router();



router.get("/", subjectController.getSubjects)
router.get("/:id", subjectController.getSubjectById)
router.post("/", subjectController.createSubject)
router.put("/:id", subjectController.updateSubject)
router.delete("/:id", subjectController.deleteSubject)



module.exports = router;