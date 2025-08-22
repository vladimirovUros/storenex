import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message, category } = await request.json();

    // Validacija
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "You need to fill in all required fields" },
        { status: 400 }
      );
    }

    // Email template
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">New message</h1>
        </div>
        
        <div style="padding: 30px; background-color: #f9f9f9;">
          <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Message details</h2>
            
            <div style="margin: 20px 0;">
              <strong style="color: #667eea;">Name:</strong> ${name}
            </div>
            
            <div style="margin: 20px 0;">
              <strong style="color: #667eea;">Email:</strong> 
              <a href="mailto:${email}" style="color: #333;">${email}</a>
            </div>
            
            <div style="margin: 20px 0;">
              <strong style="color: #667eea;">Category:</strong> ${category}
            </div>
            
            <div style="margin: 20px 0;">
              <strong style="color: #667eea;">Subject:</strong> ${subject}
            </div>
            
            <div style="margin: 20px 0;">
              <strong style="color: #667eea;">Message:</strong>
              <div style="background: #f8f9fa; padding: 15px; border-left: 4px solid #667eea; margin-top: 10px;">
                ${message.replace(/\n/g, "<br>")}
              </div>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #666; font-size: 14px;">
            Sent from storenex contact form
          </div>
        </div>
      </div>
    `;

    const data = await resend.emails.send({
      from: "storenex <contact@storenex.shop>",
      to: ["urosvladimirov@gmail.com"],
      subject: `New message: ${subject}`,
      html: emailHtml,
      replyTo: email,
    });

    console.log("Email sent successfully:", data);

    return NextResponse.json(
      { message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Error sending message" },
      { status: 500 }
    );
  }
}
