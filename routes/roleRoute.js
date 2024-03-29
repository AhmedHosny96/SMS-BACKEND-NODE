const roleController = require("../controllers/roleController");

const router = require("express").Router();

router.get("/", roleController.getRole);
router.get("/:schoolId", roleController.getRolesBySchool);
router.get("/id/:id", roleController.getRoleById);
router.post("/", roleController.createRole);
router.put("/:id", roleController.updateRole);
router.delete("/:id", roleController.deleteRole);

module.exports = router;
