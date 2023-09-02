const userController = require("../controllers/userController");

const router = require("express").Router();

router.get("/", userController.getUser);
router.get("/:schoolId", userController.getUsersBySchool);
router.get("/id/:id", userController.getUserById);
// router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.put("/reset-password/:userId", userController.resetPassword);
router.delete("/:id", userController.deleteUser);

module.exports = router;
