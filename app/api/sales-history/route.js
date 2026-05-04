import { connectDB } from "../../../lib/db";
import Sale from "../../../models/Sale";

export async function GET() {
  await connectDB();
  const sales = await Sale.find().sort({ date: -1 });
  return Response.json(sales);
}