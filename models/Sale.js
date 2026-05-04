import mongoose from "mongoose";

const SaleSchema = new mongoose.Schema({
  name: String,
  costPrice: Number,
  sellingPrice: Number,
  quantity: Number,
  profit: Number,

  date: {
    type: Date,
    default: Date.now, // ✅ THIS IS IMPORTANT
  },
});

export default mongoose.models.Sale || mongoose.model("Sale", SaleSchema);