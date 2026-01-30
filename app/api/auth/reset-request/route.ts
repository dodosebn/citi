import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabase } from "@/app/store/supabase";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({
      message: "If the email exists, a reset link was sent.",
    });
  }

  const { data: user } = await supabase
    .from("citisignup")
    .select("id, email")
    .eq("email", email)
    .single();

  // Always return same response (prevents email enumeration)
  if (!user) {
    return NextResponse.json({
      message: "If the email exists, a reset link was sent.",
    });
  }

  const rawToken = crypto.randomBytes(32).toString("hex");
  const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");

  await supabase.from("password_resets").insert({
    user_id: user.id,
    token_hash: tokenHash,
    expires_at: new Date(Date.now() + 1000 * 60 * 30), // 30 min
  });
  const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL;

  const resetUrl = `${origin}/account/auth/resetpassword?token=${rawToken}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODE_EMAIL,
      pass: process.env.NODE_PASS,
    },
  });

  await transporter.sendMail({
    from: `"City Bank" <${process.env.NODE_EMAIL}>`,
    to: email,
    subject: "Password Reset Link",
    text: `Click the link to reset your password: ${resetUrl}`,
    html: `
    <div style="font-family:Arial;font-size:15px">
      <p>Click the link below to reset your password. It will expire in 30 minutes:</p>
      <a href="${resetUrl}">${resetUrl}</a>
    </div>
  `,
  });

  // TODO: send email (Resend, SendGrid, etc.)
  console.log("RESET LINK:", resetUrl);

  return NextResponse.json({
    message: "If the email exists, a reset link was sent.",
  });
}
