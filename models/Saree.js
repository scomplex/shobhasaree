import mongoose from "mongoose";

const SareeSchema = new mongoose.Schema({
  name: String,
  quantity: Number,

  basePrice: Number,
  taxPercent: Number,
  costPrice: Number,
});

export default mongoose.models.Saree || mongoose.model("Saree", SareeSchema);