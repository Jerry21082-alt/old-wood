import bcrypt from "bcryptjs";
import User from "@/models/user";
import dbConnect from "@/utils/dbConnect";

export async function POST(request) {
  try {
    await dbConnect();
    const { firstName, lastName, email, password } = await request.json();

    if (!email || !password || !firstName || !lastName) {
      return new Response(
        JSON.stringify({ error: "All fields are required!" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return new Response(JSON.stringify({ error: "User already exists!" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    return new Response(
      JSON.stringify({ message: "User registered successfully!" }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in register API:", error);
    return new Response(JSON.stringify({ error: "Internal server error!" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
