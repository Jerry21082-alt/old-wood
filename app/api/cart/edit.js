import User from "../../../models/user";
import dbConnect from "@/utils/dbConnect";

export default async function handler(req, res) {
  if (req.method !== "PUT")
    return res.status(405).json({ message: "Method not allowed!" });

  const { userId, itemId, quantity } = req.body;

  try {
    await dbConnect();
    const user = User.findById(userId);
    const item = user.cart.find((item) => item.itemId === itemId);

    if (item) {
      item.quantity = quantity;
      await user.save();
      res.status(200).json({ message: "Cart updated!", cart: user.cart });
    } else {
      res.status(404).json({ message: "Item not found in cart!" });
    }
  } catch (error) {
    res.status(404).json({ message: "Item not found!" });
  }
}
