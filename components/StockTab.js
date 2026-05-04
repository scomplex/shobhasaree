"use client";

import { useEffect, useState } from "react";
import AddStockModal from "./AddStockModal";

export default function StockTab() {
  const [data, setData] = useState([]);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch("/api/stock");
    const d = await res.json();
    setData(d);
  };

  return (
    <div className="mt-4">

      <button
        onClick={() => setShowAdd(true)}
        className="bg-green-500 text-white p-3 rounded-xl w-full"
      >
        ➕ Add Stock
      </button>

      <div className="mt-3 space-y-2">
        {data.map((item) => (
          <div key={item._id} className="bg-white p-3 rounded-xl border">
            <p className="font-bold">{item.name}</p>
            <p>₹{item.costPrice}</p>
            <p>{item.quantity} pcs</p>
          </div>
        ))}
      </div>

      {showAdd && (
        <AddStockModal close={() => setShowAdd(false)} refresh={fetchData} />
      )}
    </div>
  );
}