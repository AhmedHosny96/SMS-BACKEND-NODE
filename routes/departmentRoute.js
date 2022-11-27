const departmentController = require("../controllers/departmentController");

const router = require("express").Router();

router.get("/", departmentController.getDepartments);
router.get("/:id", departmentController.getDepartmentById);
router.post("/", departmentController.createDepartment);
router.put("/:id", departmentController.updateDepartment);
router.delete("/:id", departmentController.deleteDepartment);

module.exports = router;
