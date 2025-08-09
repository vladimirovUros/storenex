import type { Stripe } from "stripe";
import { getPayload } from "payload";
import config from "@payload-config";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { ExpandedLineItem } from "@/modules/checkout/types";

export async function POST(request: Request) {
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      await (await request.blob()).text(),
      request.headers.get("stripe-signature") as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    console.log(`❌ Unexpected error: ${errorMessage}`);

    if (error instanceof Error) {
      console.log("Error stack:", error.stack);
    } else {
      console.log("Non-Error object:", error);
    }

    return NextResponse.json(
      { message: "Webhook Error: " + errorMessage },
      { status: 400 }
    );
  }
  console.log(`✅ Success: ${event.id}, ${event.type}`);

  const permittedEvents: string[] = [
    "checkout.session.completed",
    // "payment_intent.succeeded",
    // "payment_intent.payment_failed",
  ];

  const payload = await getPayload({ config });

  if (permittedEvents.includes(event.type)) {
    try {
      switch (event.type) {
        case "checkout.session.completed":
          const data = event.data.object as Stripe.Checkout.Session;
          if (!data.metadata?.userId) {
            throw new Error("User ID is required");
          }
          const user = await payload.findByID({
            collection: "users",
            id: data.metadata.userId,
          });
          if (!user) {
            throw new Error("User not found");
          }

          const expandedSession = await stripe.checkout.sessions.retrieve(
            data.id,
            {
              expand: ["line_items.data.price.product"],
            }
          );
          if (
            !expandedSession.line_items?.data ||
            !expandedSession.line_items.data.length
          ) {
            throw new Error("No line items found in session"); //we could load what you purchased, to otp to znaci..
          }
          const lineItems = expandedSession.line_items
            .data as ExpandedLineItem[];

          for (const item of lineItems) {
            await payload.create({
              collection: "orders",
              data: {
                stripeCheckoutSessionId: data.id,
                user: user.id,
                product: item.price.product.metadata.id,
                name: item.price.product.name,
              },
            });
          }
          break;
        default:
          throw new Error(`Unhandled event type: ${event.type}`);
      }
    } catch (error) {
      console.error(`❌ Error handling webhook: ${error}`);
      return NextResponse.json(
        {
          message: "Webhook handler failed",
        },
        { status: 500 }
      );
    }
  }
  return NextResponse.json(
    {
      message: "Webhook event processed successfully",
    },
    { status: 200 }
  );
}
