import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseTable from "../components/ExpenseTable";
import PieChart from "../components/PieChart";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const navigate = useNavigate();

  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    navigate("/login"); // Redirect to login page
  };

  useEffect(() => {
    // Fetch the expenses from the backend
    const fetchExpenses = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch("http://localhost:5000/api/expenses", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setExpenses(data);
      } else {
        console.error(data.message);
      }
    };

    fetchExpenses();
  }, [navigate]);

  const handleAddExpense = async (expenseData) => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/api/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(expenseData),
    });

    const data = await response.json();
    if (response.ok) {
      setExpenses([data, ...expenses]);
    } else {
      console.error(data.message);
    }
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
  };

  const handleDeleteExpense = async (id) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:5000/api/expenses/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      setExpenses(expenses.filter((expense) => expense._id !== id));
    } else {
      const data = await response.json();
      console.error(data.message);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Expense Tracker</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded-md"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1">
          <ExpenseForm onSubmit={handleAddExpense} expense={editingExpense} />
        </div>
        <div className="col-span-1">
          <PieChart expenses={expenses} />
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold">Expense List</h3>
        <ExpenseTable expenses={expenses} onEdit={handleEditExpense} onDelete={handleDeleteExpense} />
      </div>
    </div>
  );
};

export default Dashboard;
