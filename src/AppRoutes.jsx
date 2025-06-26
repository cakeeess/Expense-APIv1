import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ExpenseTracker from "./pages/track";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/track" element={<ExpenseTracker />} />
    </Routes>
  );
};

export default AppRoutes;
