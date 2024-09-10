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
    const name = url.searchParams.get("name");
    const pairLimit = parseInt(url.searchParams.get("pairLimit")) || 8;

    let item;

    if (id) {
      item = await collection.findOne({ _id: new ObjectId(id) });
    } else if (name) {
      item = await collection.findOne({
        name: { $regex: new RegExp(name, "i") },
      });
    }

    if (!item) {
      return NextResponse.json(
        { success: false, error: "Item not found" },
        { status: 404 }
      );
    }

    const itemCategory = await collection
      .find({ category: item.category, _id: { $ne: new ObjectId(id) } })
      .limit(pairLimit)
      .toArray();

    return NextResponse.json({
      success: true,
      itemCategory,
      item,
    });
  } catch (error) {
    console.error("Error fetching item category:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch item category" },
      { status: 500 }
    );
  }
}
