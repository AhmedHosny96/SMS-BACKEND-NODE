const schoolBranchController = require("../controllers/schoolBranchController");
const router = require("express").Router();

router.get("/", schoolBranchController.getBranches);
router.get("/:id", schoolBranchController.getBranchById);
router.post("/", schoolBranchController.createBranch);
router.put("/:id", schoolBranchController.updateBranch);
router.delete("/:id", schoolBranchController.deleteBranch);

module.exports = router;
