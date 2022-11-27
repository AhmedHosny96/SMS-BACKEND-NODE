const authController = require("../controllers/authController");

const router = require("express").Router();

// router.get("/", authController.getassets);
// router.get("/:id", authController.getAssetById);
router.post("/create-user", authController.createUser);
router.post("/login", authController.login);
// router.put("/:id", authController.updateAsset);
// router.delete("/:id", authController.deleteAsset);

module.exports = router;
