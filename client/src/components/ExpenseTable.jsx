import React, { useState, useEffect } from "react";

const ExpenseTable = ({ expenses, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">Category</th>
            <th className="px-4 py-2 text-left">Amount</th>
            <th className="px-4 py-2 text-left">Created At</th>
            <th className="px-4 py-2 text-left">Updated At</th>
            <th className="px-4 py-2 text-left">Comments</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id}>
              <td className="border px-4 py-2">{expense.category}</td>
              <td className="border px-4 py-2">${expense.amount}</td>
              <td className="border px-4 py-2">{new Date(expense.createdAt).toLocaleString()}</td>
              <td className="border px-4 py-2">{new Date(expense.updatedAt).toLocaleString()}</td>
              <td className="border px-4 py-2">{expense.comments || "N/A"}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => onEdit(expense)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(expense._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
