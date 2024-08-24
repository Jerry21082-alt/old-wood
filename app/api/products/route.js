import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongoose";

export async function POST(request) {
  try {
    const productData = await request.json(); // Parse the JSON body
    console.log("Product Data Received:", productData);

    const client = await clientPromise;
    const db = client.db("oldwood");
    const collection = db.collection("products");

    const result = await collection.insertMany(productData);

    return NextResponse.json({ success: true, productId: result.insertedId });
  } catch (error) {
    console.error("Error saving product:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save product" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db("oldwood");
    const collection = db.collection("products");

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page")) || 1;
    const limit = parseInt(url.searchParams.get("limit")) || 10;
    const pairLimit = parseInt(url.searchParams.get("pairLimit")) || 8;
    const id = url.searchParams.get("id");

    const skip = (page - 1) * limit;

    const products = await collection
      .find({})
      .skip(skip)
      .limit(limit)
      .toArray();

    const totalItems = await collection.countDocuments();

    return NextResponse.json({
      products,
      totalItems,
      id,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
