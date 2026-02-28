import { supabase } from "@/app/store/supabase";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    const { error: otpError } = await supabase.from("otp_codes").insert({
      email,
      code: otp,
      expires_at: expiresAt,
    });

    if (otpError) {
      return NextResponse.json(
        { error: "Failed to save OTP" },
        { status: 500 }
      );
    }

    const emailUser = process.env.NODE_EMAIL;
    const emailPass = process.env.NODE_PASS;

    if (!emailUser || !emailPass) {
      console.error("❌ Email configuration missing (NODE_EMAIL or NODE_PASS)");
      return NextResponse.json(
        { error: "Email service configuration missing" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass, 
      },
    });

    try {
      await transporter.sendMail({
        from: `"City Bank" <${process.env.EMAIL || emailUser}>`,
        to: email,
        subject: "Your Verification OTP",
        text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
        html: `
          <div style="font-family:Arial;font-size:15px">
            <p>Your OTP is:</p>
            <h2>${otp}</h2>
            <p>It expires in <b>5 minutes</b>.</p>
          </div>
        `,
      });
    } catch (mailError: any) {
      console.error("❌ Nodemailer Error:", mailError);
      return NextResponse.json(
        { error: "Failed to send email", details: mailError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: "OTP sent" });

  } catch (error: any) {
    console.error("💥 OTP Global Error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}