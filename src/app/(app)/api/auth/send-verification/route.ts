import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@/payload.config";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const payload = await getPayload({ config });

    const users = await payload.find({
      collection: "users",
      where: {
        email: {
          equals: email,
        },
      },
    });

    if (users.docs.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = users.docs[0];

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.isVerified) {
      return NextResponse.json(
        { error: "User is already verified" },
        { status: 400 }
      );
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpiry = new Date(
      Date.now() + 24 * 60 * 60 * 1000
    ).toISOString();

    await payload.update({
      collection: "users",
      id: user.id,
      data: {
        verificationToken,
        verificationTokenExpiry,
      },
    });

    const verificationUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email?token=${verificationToken}`;

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Verify Your Email</h1>
        </div>
        
        <div style="padding: 40px 30px; background-color: #f9f9f9;">
          <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #333; text-align: center; margin-bottom: 20px;">Welcome to storenex!</h2>
            
            <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Hi there 👋
            </p>
            
            <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
              Thanks for joining storenex! We're excited to have you on board. To get started with your online store, please confirm your email address by clicking the button below.
            </p>
            
            <div style="text-align: center; margin: 40px 0;">
              <a href="${verificationUrl}" 
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        color: white; 
                        padding: 15px 30px; 
                        text-decoration: none; 
                        border-radius: 8px; 
                        font-weight: bold; 
                        font-size: 16px;
                        display: inline-block;">
                Verify Email Address
              </a>
            </div>
            
            <p style="color: #999; font-size: 14px; text-align: center; margin-top: 30px;">
              This link will expire in 24 hours. If you didn't create this account, you can safely ignore this email.
            </p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #999; font-size: 12px; text-align: center; margin: 0;">
                If the button doesn't work, copy and paste this link:<br>
                <span style="color: #667eea; word-break: break-all;">${verificationUrl}</span>
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #666; font-size: 14px;">
            Sent from storenex
          </div>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: "storenex <contact@storenex.shop>",
      to: ["urosvladimirov@gmail.com"],
      subject: "Complete your storenex registration",
      html: emailHtml,
    });

    return NextResponse.json(
      { message: "Verification email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending verification email:", error);
    return NextResponse.json(
      { error: "Error sending verification email" },
      { status: 500 }
    );
  }
}
