import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Expense Tracker</h1>
      <div className="space-x-4">
        <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-md">Login</Link>
        <Link to="/register" className="bg-green-500 text-white px-4 py-2 rounded-md">Register</Link>
      </div>
    </div>
  );
};

export default Home;