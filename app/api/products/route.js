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
    const limit = parseInt(url.searchParams.get("limit")) || 12;
    const category = url.searchParams.get("category");
    const search = url.searchParams.get("search");

    console.log("new", search)

    const skip = (page - 1) * limit;

    const matchQuery = {};

    if (category) matchQuery.category = category;
    if (search) {
      matchQuery.$text = { $search: search };
    }

    const results = await collection
      .aggregate([
        {
          $match: matchQuery,
        },
        {
          $facet: {
            paginatedProducts: [{ $skip: skip }, { $limit: limit }],
            totalItems: [{ $count: "count" }],
          },
        },
      ])
      .toArray();

    const paginatedProducts = results[0].paginatedProducts;
    const totalItems = results[0].totalItems[0]
      ? results[0].totalItems[0].count
      : 0;

    return NextResponse.json({
      products: paginatedProducts,
      totalItems,
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
