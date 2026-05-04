import { connectDB } from "../../../lib/db";
import Saree from "../../../models/Saree";
import Sale from "../../../models/Sale";

export async function POST(req) {
  await connectDB();
  const { id, sellingPrice, quantity } = await req.json();

  const saree = await Saree.findById(id);

  if (!saree || saree.quantity < quantity) {
    return Response.json({ error: "No stock" });
  }

  saree.quantity -= quantity;
  await saree.save();

  const profit =
    (sellingPrice - saree.costPrice) * quantity;

  await Sale.create({
    name: saree.name,
    costPrice: saree.costPrice,
    sellingPrice,
    quantity,
    profit,
  });

  return Response.json({ success: true });
}