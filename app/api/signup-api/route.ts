import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabase } from "@/app/store/supabase";

export async function POST(req: Request) {
  try {
    const {
      fname,
      lname,
      email,
      password,
      birthday,
      gender,
      pin,
      documents, 
    } = await req.json();

    if (!fname || !lname || !email || !password || !birthday || !gender || !pin) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from("citisignup")
      .select("id")
      .eq("email", email)
      .single();

    if (existingUser) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Store only the first document path (or null if none)
    const document_path = documents && documents.length > 0 ? documents[0] : null;

    // Insert user into database
    const { data: insertData, error: dbError } = await supabase
      .from("citisignup")
      .insert([
        {
          fname,
          lname,
          email,
          password: hashedPassword,
          birthday,
          gender,
          pin,
          document_path, // single file path
        },
      ])
      .select();

    if (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Signup successful", user: insertData[0] },
      { status: 201 }
    );
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
