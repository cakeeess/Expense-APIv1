import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex w-full flex-col items-center justify-center bg-gray-100 font-serif text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Expense Tracker</h1>
      <Link
        to="/track"
        className="text-white bg-black px-6 py-3 rounded-md hover:bg-gray-800 transition"
      >
        Go to Tracker
      </Link>
    </div>
  );
};

export default Home;
