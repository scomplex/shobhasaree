"use client";

import { useState } from "react";
import SellTab from "@/components/SellTab";
import StockTab from "@/components/StockTab";
import ReportTab from "@/components/ReportTab";

export default function Home() {
  const [tab, setTab] = useState("sell");
  const [isAdmin, setIsAdmin] = useState(false);

  const unlock = () => {
    const pass = prompt("Enter Password");
    if (pass === "1234") setIsAdmin(true);
    else alert("Wrong Password");
  };

  return (
    <div className="p-3 bg-[#fdf3f8] min-h-screen">

      {/* HEADER */}
      <div className="bg-pink-500 text-white p-4 rounded-2xl text-xl font-bold flex justify-between">
        Shobha Saree
        <button onClick={unlock}>⚙️</button>
      </div>

      {/* NAV */}
      <div className="flex gap-2 mt-3">
        <button onClick={() => setTab("sell")} className="flex-1 bg-white p-2 rounded-xl">
          🪙 Becho
        </button>

        {isAdmin && (
          <>
            <button onClick={() => setTab("stock")} className="flex-1 bg-white p-2 rounded-xl">
              📦 Stock
            </button>

            <button onClick={() => setTab("report")} className="flex-1 bg-white p-2 rounded-xl">
              📊 Report
            </button>
          </>
        )}
      </div>

      {/* TABS */}
      {tab === "sell" && <SellTab />}
      {tab === "stock" && isAdmin && <StockTab />}
      {tab === "report" && isAdmin && <ReportTab />}
    </div>
  );
}