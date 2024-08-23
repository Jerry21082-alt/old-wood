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

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("oldwood");
    const collection = db.collection("products");

    const products = await collection.find({}).toArray();

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
