"use client";

import { useEffect, useState } from "react";
import SellModal from "./SellModal";

export default function SellTab() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch("/api/stock");
    const d = await res.json();
    setData(d);
  };

  return (
    <>
      <input
        placeholder="🔍 Saree dhundho..."
        className="w-full mt-4 p-3 rounded-xl"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-2 gap-3 mt-3">
        {data
          .filter((i) =>
            i.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((item) => (
            <div
              key={item._id}
              onClick={() => setSelected(item)}
              className="bg-white p-3 rounded-xl border"
            >
              <p className="font-bold">{item.name}</p>
              <p className="text-sm">₹{item.costPrice}</p>
              <p className="text-xs text-gray-400">
                {item.quantity} pcs
              </p>
            </div>
          ))}
      </div>

      {selected && (
        <SellModal
          item={selected}
          close={() => setSelected(null)}
          refresh={fetchData}
        />
      )}
    </>
  );
}