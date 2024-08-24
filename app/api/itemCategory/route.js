// pages/api/itemCategory.js
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongoose";
import { ObjectId } from "mongodb";

export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db("oldwood");
    const collection = db.collection("products");

    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    const pairLimit = parseInt(url.searchParams.get("pairLimit")) || 8;

    // Fetch the specific item by ID
    const item = await collection.findOne({ _id: new ObjectId(id) });

    if (!item) {
      return NextResponse.json(
        { success: false, error: "Item not found" },
        { status: 404 }
      );
    }

    // Fetch items in the same category, excluding the current item
    const itemCategory = await collection
      .find({ category: item.category, _id: { $ne: new ObjectId(id) } })
      .limit(pairLimit)
      .toArray();

    return NextResponse.json({ success: true, itemCategory });
  } catch (error) {
    console.error("Error fetching item category:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch item category" },
      { status: 500 }
    );
  }
}
