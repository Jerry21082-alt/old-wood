import User from "@/models/user";
import dbConnect from "@/utils/dbConnect";

export default async function handler(req, res) {
  if (req.method !== "DELETE")
    return res.status(405).json({ message: "Method not allowed!" });

  const { userId, itemId } = req.body;

  try {
    await dbConnect();
    const user = await User.findById(userId);

    if (user) {
      user.cart = user.cart.filter((item) => item.itemId !== itemId);
      await user.save();
      res
        .status(200)
        .json({ message: "Item removed from cart!", cart: user.cart });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
