const departmentController = require("../controllers/departmentController");

const router = require("express").Router();

router.get("/", departmentController.getDepartments);
router.get("/:schoolId", departmentController.getDepartmentsBySchool);
router.get("/id/:id", departmentController.getDepartmentById);
router.post("/", departmentController.createDepartment);
router.put("/:id", departmentController.updateDepartment);
router.delete("/:id", departmentController.deleteDepartment);

module.exports = router;
