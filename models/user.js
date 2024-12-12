import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: [
    {
      _id: { type: String, required: true },
      name: { type: String, required: true },
      description: { type: String },
      imgSrc: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      type: { type: String },
    },
  ],
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
