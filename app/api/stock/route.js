import { connectDB } from "../../../lib/db";
import Saree from "../../../models/Saree";
export async function GET() {
  await connectDB();
  const data = await Saree.find();
  return Response.json(data);
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();

  const costPrice =
    body.basePrice + (body.basePrice * body.taxPercent) / 100;

  const saree = await Saree.create({
    ...body,
    costPrice,
  });

  return Response.json(saree);
}