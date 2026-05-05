"use client";
import { useState } from "react";

export default function SellModal({ item, close, refresh }) {
  const [sp, setSp] = useState("");
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);

  const sell = async () => {
    if (!sp || !qty) {
      alert("Enter price & quantity");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/sale", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: item._id,
          sellingPrice: Number(sp),
          quantity: Number(qty),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Sale failed");
      }

      alert("✅ Sale recorded successfully");

      refresh();
      close();

    } catch (err) {
      console.error(err);
      alert("❌ Error recording sale");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[92%] max-w-md rounded-3xl p-5 shadow-xl">

        {/* HEADER */}
        <h2 className="text-xl font-bold mb-1">{item.name}</h2>

        <p className="text-sm text-gray-500 mb-4">
          Cost: ₹{item.costPrice} | Stock: {item.quantity}
        </p>

        {/* SELL PRICE */}
        <div className="mb-4">
          <label className="text-sm font-medium">Selling Price</label>
          <input
            type="number"
            placeholder="Enter price"
            value={sp}
            onChange={(e) => setSp(e.target.value)}
            className="w-full mt-1 p-3 border rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {/* QUANTITY */}
        <div className="mb-5">
          <label className="text-sm font-medium">Quantity</label>

          <div className="flex items-center gap-3 mt-1">
            <button
              disabled={loading}
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="bg-gray-200 px-4 py-2 rounded-xl text-lg disabled:opacity-50"
            >
              −
            </button>

            <div className="text-lg font-bold w-10 text-center">
              {qty}
            </div>

            <button
              disabled={loading}
              onClick={() => setQty((q) => q + 1)}
              className="bg-gray-200 px-4 py-2 rounded-xl text-lg disabled:opacity-50"
            >
              +
            </button>
          </div>
        </div>

        {/* SELL BUTTON */}
        <button
          onClick={sell}
          disabled={loading}
          className="bg-pink-500 text-white w-full p-3 rounded-xl font-bold text-lg disabled:opacity-60"
        >
          {loading ? "⏳ Selling..." : "SELL"}
        </button>

        <button
          onClick={close}
          disabled={loading}
          className="w-full mt-2 text-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}