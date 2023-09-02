const parentController = require("../controllers/parentController");

const router = require("express").Router();

router.get("/", parentController.getParents);
router.get("/:schoolId", parentController.getParentsBySchool);
router.get("/id/:id", parentController.getParentById);
router.post("/", parentController.createParent);
router.put("/:id", parentController.updateParent);
router.delete("/:id", parentController.deleteParent);

module.exports = router;
