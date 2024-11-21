import React, { useState } from 'react';

const ExpenseForm = ({ onSubmit, expense = {} }) => {
  // Use an empty object as a fallback for `expense`
  const [category, setCategory] = useState(expense?.category || ''); // Optional chaining
  const [amount, setAmount] = useState(expense?.amount || ''); // Optional chaining
  const [comments, setComments] = useState(expense?.comments || ''); // Optional chaining

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ category, amount, comments });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        <input
          id="category"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="comments" className="block text-sm font-medium text-gray-700">Comments</label>
        <textarea
          id="comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">Save Expense</button>
    </form>
  );
};

export default ExpenseForm;
