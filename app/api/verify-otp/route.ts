import { supabase } from "@/app/store/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    console.log("🔐 OTP Verification Request:", { email, otp });

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 400 }
      );
    }

    const cleanOtp = otp.toString().trim();

    // Query the otp_codes table (matching your send-otp API)
    const { data, error } = await supabase
      .from("otp_codes")
      .select("*")
      .eq("email", email.toLowerCase().trim())
      .eq("code", cleanOtp)
      .gt("expires_at", new Date().toISOString())
      .order("created_at", { ascending: false })
      .limit(1);

    console.log(" Database query result:", { data, error });

    if (error) {
      console.error("❌ Database error:", error);
      return NextResponse.json(
        { error: "Database query failed" },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      console.log("⚠️ No valid OTP found");
      
      // Check what OTPs are actually in the database for debugging
      const { data: allOtps } = await supabase
        .from("otp_codes")
        .select("*")
        .eq("email", email.toLowerCase().trim())
        .order("created_at", { ascending: false })
        .limit(5);
      
      console.log("📋 Recent OTPs for this email:", allOtps);
      
      return NextResponse.json(
        { 
          error: "Invalid or expired OTP",
          debug: {
            availableOtps: allOtps,
            currentTime: new Date().toISOString(),
            emailUsed: email.toLowerCase().trim(),
            otpUsed: cleanOtp
          }
        },
        { status: 400 }
      );
    }

    const otpRecord = data[0];
    console.log("✅ Valid OTP found:", otpRecord);

    // Optionally mark OTP as used (if you want to prevent reuse)
    // If your table doesn't have a 'used' column, you can delete it or ignore
    const { error: deleteError } = await supabase
      .from("otp_codes")
      .delete()
      .eq("id", otpRecord.id);

    if (deleteError) {
      console.error("❌ Failed to delete used OTP:", deleteError);
      // Continue anyway - verification succeeded
    }

    console.log("🎉 OTP verified successfully!");
    
    return NextResponse.json({ 
      success: true, 
      message: "OTP verified successfully",
      data: {
        email: otpRecord.email,
        expires_at: otpRecord.expires_at
      }
    });

  } catch (error: any) {
    console.error("💥 OTP verification error:", error);
    return NextResponse.json(
      { 
        error: "Internal server error",
        details: error.message
      },
      { status: 500 }
    );
  }
}