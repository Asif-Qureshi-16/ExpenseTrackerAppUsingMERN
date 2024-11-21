const Expense = require("../models/expenseModel");

const addExpense = async (req, res) => {
  const { category, amount, comments } = req.body;
  const user = req.user.id;

  try {
    const expense = new Expense({ category, amount, comments, user });
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { category, amount, comments } = req.body;

  try {
    const expense = await Expense.findById(id);
    if (!expense) return res.status(404).json({ message: "Expense not found" });

    if (expense.user.toString() !== req.user.id) return res.status(403).json({ message: "Unauthorized" });

    expense.category = category || expense.category;
    expense.amount = amount || expense.amount;
    expense.comments = comments || expense.comments;

    await expense.save();
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await Expense.findById(id);
    if (!expense) return res.status(404).json({ message: "Expense not found" });

    if (expense.user.toString() !== req.user.id) return res.status(403).json({ message: "Unauthorized" });

    await expense.remove();
    res.json({ message: "Expense deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addExpense, getExpenses, updateExpense, deleteExpense };
