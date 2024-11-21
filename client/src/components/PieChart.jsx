import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const PieChart = ({ expenses }) => {
  const categories = expenses.reduce((acc, expense) => {
    acc[expense.category] = acc[expense.category] || 0;
    acc[expense.category] += expense.amount;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categories),
    datasets: [
      {
        data: Object.values(categories),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h3 className="text-xl font-semibold mb-4">Expense Distribution by Category</h3>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
