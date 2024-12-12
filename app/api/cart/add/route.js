import dbConnect from "@/utils/dbConnect";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await dbConnect();

    const { userId, _id, imgSrc, name, description, price, quantity, type } =
      await request.json();

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: "User not found!" }, { status: 404 });
    }

    const existingItemIndex = user.cart.findIndex((item) => item._id === _id);

    if (existingItemIndex > -1) {
      user.cart[existingItemIndex].quantity += quantity;
    } else {
      user.cart.push({
        _id,
        name,
        description,
        price,
        quantity,
        type,
        imgSrc,
      });
    }

    await user.save();

    return NextResponse.json(
      { success: true, cart: user.cart },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return NextResponse.json(
      { error: "Internal server error!" },
      { status: 500 }
    );
  }
}
