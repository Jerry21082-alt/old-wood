import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  img: { type: String, required: true },
  srcSet: { type: String, required: true },
});

const dimensionsSchema = new mongoose.Schema({
  width: { type: Number, required: true },
  length: { type: Number, required: true },
  depth: { type: Number, required: true },
  height: { type: Number, required: true },
  seatHeight: { type: Number, required: true },
  seatDepth: { type: Number, required: true },
  armHeight: { type: Number, required: true },
});

const productSchema = new mongoose.Schema({
  id: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  description: { type: String, required: true },
  primaryImage: { type: imageSchema, required: true },
  secondaryImage: { type: imageSchema, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  colors: [{ type: String, required: true }],
  toOrder: { type: Boolean, required: true },
  allImages: { type: [imageSchema], required: true },
  dimensions: { type: dimensionsSchema },
});

productSchema.index({ name: "text", description: "text" })

export default mongoose.models.Products ||
  mongoose.model("Products", productSchema);
