"use client";

import { useEffect, useState } from "react";

export default function ReportTab() {
  const [report, setReport] = useState(null);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  // 🔥 ALWAYS LOAD TODAY FIRST
  useEffect(() => {
    fetchReport("today");
  }, []);

  // 🔥 AUTO RUN CUSTOM WHEN BOTH DATES SET
  useEffect(() => {
    if (from && to) {
      fetchReport("custom", from, to);
    }
  }, [from, to]);

  const fetchReport = async (type, f = "", t = "") => {
    console.log("🔥 API CALL:", type, f, t);

    const res = await fetch("/api/report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type,
        from: f,
        to: t,
      }),
    });

    const data = await res.json();
    setReport(data);
  };

  return (
    <div className="mt-4">

      {/* BUTTONS */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => fetchReport("today")}
          className="bg-pink-500 text-white p-2 rounded-xl"
        >
          Today
        </button>

        <button
          onClick={() => fetchReport("month")}
          className="bg-purple-500 text-white p-2 rounded-xl"
        >
          Month
        </button>
      </div>

      {/* DATE INPUTS */}
      <input
        type="date"
        value={from || ""}
        className="w-full mt-3 p-2 border rounded-xl"
        onChange={(e) => setFrom(e.target.value)}
      />

      <input
        type="date"
        value={to || ""}
        className="w-full mt-2 p-2 border rounded-xl"
        onChange={(e) => setTo(e.target.value)}
      />

      {/* REPORT */}
      {report && (
        <div className="grid grid-cols-2 gap-3 mt-4">

          <Card title="Sales" value={report.totalSalesAmount} />
          <Card title="Profit" value={report.totalProfit} />
          <Card title="Pieces" value={report.totalPieces} />
          <Card title="Bills" value={report.totalBills} />

        </div>
      )}
      {/* SALES HISTORY */}
{report?.sales?.length > 0 && (
  <div className="mt-5 bg-white p-4 rounded-2xl border">

    <h2 className="font-bold mb-3">🧾 Sales History</h2>

    {report.sales.map((s, i) => (
      <div key={i} className="border-b py-2 flex justify-between">

        <div>
          <p className="font-bold">{s.name}</p>

          <p className="text-xs text-gray-500">
            ₹{s.sellingPrice} × {s.quantity}
          </p>

          <p className="text-xs text-gray-400">
            {new Date(s.date).toLocaleDateString()}
          </p>
        </div>

        <p className="text-green-600 font-bold">
          ₹{s.profit}
        </p>

      </div>
    ))}

  </div>
)}
    </div>
  );
}

const Card = ({ title, value }) => (
  <div className="bg-white p-4 rounded-xl border shadow-sm">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-xl font-bold">₹{value}</p>
  </div>
);
