import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabase } from "@/app/store/supabase";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ message: "If the email exists, a reset link was sent." });
  }

  const { data: user } = await supabase
    .from("citisignup")
    .select("id, email")
    .eq("email", email)
    .single();

  // Always return same response (prevents email enumeration)
  if (!user) {
    return NextResponse.json({ message: "If the email exists, a reset link was sent." });
  }

  const rawToken = crypto.randomBytes(32).toString("hex");
  const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");

  await supabase.from("password_resets").insert({
    user_id: user.id,
    token_hash: tokenHash,
    expires_at: new Date(Date.now() + 1000 * 60 * 30), // 30 min
  });

  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${rawToken}`;

  // TODO: send email (Resend, SendGrid, etc.)
  console.log("RESET LINK:", resetUrl);

  return NextResponse.json({ message: "If the email exists, a reset link was sent." });
}
