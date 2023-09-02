const model = require("../models/modelConfig");

const Expense = model.expenses;
const School = model.school;

const createExpense = async (req, res) => {
  const { category, quantity, description, amount, date, schoolId } = req.body;

  //   let subject = await Expense.findOne({
  //     where: {
  //       itemName: itemName,
  //     },
  //   });

  //   if (subject) return res.status(400).send("asset with the same name exists");

  let payload = {
    category,
    quantity,
    description,
    amount,
    date,
    schoolId,
  };
  await Expense.create(payload);
  res.send(payload);
};

const getExpenses = async (req, res) => {
  const expense = await Expense.findAll({});
  res.send(expense);
};

const getExpenseBySchool = async (req, res) => {
  let schoolId = req.params.schoolId;

  const expense = await Expense.findAll({
    where: { schoolId: schoolId },
    include: [School],
    raw: true,
  });
  res.send(expense);
};

const getExpenseById = async (req, res) => {
  let id = req.params.id;

  const expense = await Expense.findOne({
    where: { id: id },
  });

  if (!expense) {
    return res
      .status(404)
      .send({ status: 404, message: `expense with id ${id} not found` });
  }

  res.send(expense);
};

const updateExpense = async (req, res) => {
  let id = req.params.id;

  const expense = await Expense.update(req.body, {
    where: { id: id },
  });

  if (!expense)
    return res
      .status(404)
      .send({ status: 404, message: `expense with id ${id} not found` });

  res.status(200).send(expense);
};

const deleteExpense = async (req, res) => {
  let id = req.params.id;

  const expense = await Expense.destroy({
    where: { expenseId: id },
  });

  if (expense === null)
    return res
      .status(404)
      .send({ status: 404, message: `expense with id ${id} not found` });

  res.send("deleted expense");
};

module.exports = {
  getExpenses,
  createExpense,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getExpenseBySchool,
};
