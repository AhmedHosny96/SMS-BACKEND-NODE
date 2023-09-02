const permissionController = require("../controllers/permissionController");
const rolePermissionAssignmentController = require("../controllers/rolePermissionAssignemnt");

const router = require("express").Router();

router.get("/", permissionController.getPermission);
router.get("/:schoolId", permissionController.getPermissionsBySchool);
router.get("/id/:id", permissionController.getPermissionById);
router.post("/", permissionController.createPermission);
router.put("/:id", permissionController.updatePermission);
router.delete("/:id", permissionController.deletePermission);

router.post(
  "/assign/roles",
  rolePermissionAssignmentController.assignRolesToPermissions
);

module.exports = router;
