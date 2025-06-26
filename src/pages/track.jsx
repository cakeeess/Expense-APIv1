import React, { useState } from "react";
const ExpenseTracker = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const randomDateBetween = (startStr, endStr) => {
    const start = new Date(startStr);
    const end = new Date(endStr);
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  };
  const formatDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };
  const handleFilter = async () => {
    if (!fromDate || !toDate) {
      alert("Pick both dates!");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      if (!res.ok) throw new Error("API error");
      console.log(res)
      const data = await res.json();
      console.log(data)
      const fakeData = data.map((item) => {
        const randDate = randomDateBetween(fromDate, toDate);
        return {
          id: item.id,
          name: item.title,
          amount: Math.floor(item.price * 83), 
          date: formatDate(randDate),
        };
      });
      setTransactions(fakeData);
    } catch (err) {
      console.error(err);
      setError("Could not fetch real data, fallback triggered.");
      setTransactions([
        { id: 1, name: "Fallback Phone", amount: 15000, date: "2025-06-20" },
        { id: 2, name: "Fallback Book", amount: 500, date: "2025-06-21" },
      ]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 font-serif flex justify-center">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Track Your Expenses</h1>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <label>From: </label>
          <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} className="border rounded-md px-4 py-2 w-full sm:w-auto" />
           <label>To: </label>
          <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} className="border rounded-md px-4 py-2 w-full sm:w-auto" />
          <button onClick={handleFilter} className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition w-full sm:w-auto">
            {loading ? "Loading..." : "Filter"}
          </button>
        </div>
        {error && <div className="text-red-600 text-center mb-4">{error}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {transactions.map(txn => (
            <div key={txn.id} className="bg-white rounded-xl p-4 shadow-md border">
              <h2 className="text-xl font-semibold">{txn.name}</h2>
              <p className="text-gray-500">Amount: ₹{txn.amount}</p>
              <p className="text-sm text-gray-400">Date: {txn.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ExpenseTracker;
