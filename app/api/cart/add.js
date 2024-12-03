import User from "@/models/user";
import dbConnect from "@/utils/dbConnect";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed!" });

  const { userId, itemId, name, price, description, type, imageUrl, quantity } =
    req.body;

  try {
    await dbConnect();
    const user = await User.findById(userId);
    const existingItem = user.cart.find((item) => item.itemId === itemId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ name, price, description, type, imageUrl, quantity });
    }

    await user.save();
    res.status(200).json({ message: "Item added to cart!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
