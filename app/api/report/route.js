import { connectDB } from "../../../lib/db";
import Sale from "../../../models/Sale";

export async function POST(req) {
  await connectDB();

  const { type, from, to } = await req.json();

  let filter = {};
  const now = new Date();

  console.log("TYPE:", type);
  console.log("FROM:", from);
  console.log("TO:", to);

  // ✅ TODAY
  if (type === "today") {
    const start = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0, 0, 0, 0
    );

    const end = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23, 59, 59, 999
    );

    filter.date = { $gte: start, $lte: end };
  }

  // ✅ MONTH
  if (type === "month") {
    const start = new Date(
      now.getFullYear(),
      now.getMonth(),
      1,
      0, 0, 0, 0
    );

    const end = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23, 59, 59, 999
    );

    filter.date = { $gte: start, $lte: end };
  }

  // ✅ CUSTOM
  if (type === "custom") {
    if (!from || !to) {
      return Response.json({ error: "Select dates" });
    }

    const start = new Date(
      Number(from.split("-")[0]),
      Number(from.split("-")[1]) - 1,
      Number(from.split("-")[2]),
      0, 0, 0, 0
    );

    const end = new Date(
      Number(to.split("-")[0]),
      Number(to.split("-")[1]) - 1,
      Number(to.split("-")[2]),
      23, 59, 59, 999
    );

    filter.date = { $gte: start, $lte: end };
  }

  console.log("FINAL FILTER:", filter);

  const sales = await Sale.find(filter);

  console.log("SALES FOUND:", sales.length);

  let totalSalesAmount = 0;
  let totalProfit = 0;
  let totalPieces = 0;

  sales.forEach((s) => {
    totalSalesAmount += s.sellingPrice * s.quantity;
    totalProfit += s.profit;
    totalPieces += s.quantity;
  });

  return Response.json({
    totalSalesAmount,
    totalProfit,
    totalPieces,
    totalBills: sales.length,
    sales
  });
}