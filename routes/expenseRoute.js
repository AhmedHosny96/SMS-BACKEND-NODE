const expensesController = require("../controllers/expensesController");

const router = require("express").Router();

router.get("/", expensesController.getExpenses);
router.get("/:schoolId", expensesController.getExpenseBySchool);
router.get("/id/:id", expensesController.getExpenseById);
router.post("/", expensesController.createExpense);
router.put("/:id", expensesController.updateExpense);
router.delete("/:id", expensesController.deleteExpense);

module.exports = router;
