const assetController = require("../controllers/assetController");

const router = require("express").Router();

router.get("/", assetController.getassets);
router.get("/:id", assetController.getAssetById);
router.post("/", assetController.createAsset);
router.put("/:id", assetController.updateAsset);
router.delete("/:id", assetController.deleteAsset);

module.exports = router;
