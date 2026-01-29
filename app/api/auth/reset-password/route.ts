import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { supabase } from "@/app/store/supabase";

export async function POST(req: Request) {
  const { token, password } = await req.json();

  if (!token || !password) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

  const { data: reset } = await supabase
    .from("password_resets")
    .select("id, user_id, expires_at")
    .eq("token_hash", tokenHash)
    .single();

  if (!reset || new Date(reset.expires_at) < new Date()) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await supabase
    .from("citisignup")
    .update({ password: hashedPassword })
    .eq("id", reset.user_id);

  await supabase
    .from("password_resets")
    .delete()
    .eq("id", reset.id);

  return NextResponse.json({ message: "Password reset successful" });
}
