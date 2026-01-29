import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { supabase } from "@/app/store/supabase";

const SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    const { data: adminUser, error } = await supabase
      .from("admin")
      .select("id, email, password")
      .eq("email", email)
      .maybeSingle();

    if (!adminUser || error) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }

    const isMatch = await bcrypt.compare(password, adminUser.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }

    const token = jwt.sign(
      { userId: adminUser.id, role: "admin" },
      SECRET,
      { expiresIn: "2h" }
    );

    return NextResponse.json({ token }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
