import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@/payload.config";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { error: "Verification token is required" },
        { status: 400 }
      );
    }

    const payload = await getPayload({ config });

    // Pronađi korisnika po verification tokenu
    const users = await payload.find({
      collection: "users",
      where: {
        verificationToken: {
          equals: token,
        },
      },
    });

    if (users.docs.length === 0) {
      return NextResponse.json(
        { error: "Invalid verification token" },
        { status: 400 }
      );
    }

    const user = users.docs[0];

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Proveri da li je token istekao
    if (
      user.verificationTokenExpiry &&
      new Date(user.verificationTokenExpiry) < new Date()
    ) {
      return NextResponse.json(
        { error: "Verification token has expired" },
        { status: 400 }
      );
    }

    // Verifikuj korisnika
    await payload.update({
      collection: "users",
      id: user.id,
      data: {
        isVerified: true,
        verificationToken: null,
        verificationTokenExpiry: null,
      },
    });

    return NextResponse.json(
      { message: "Email verified successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying email:", error);
    return NextResponse.json(
      { error: "Error verifying email" },
      { status: 500 }
    );
  }
}
