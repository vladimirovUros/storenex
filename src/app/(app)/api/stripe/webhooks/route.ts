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
  console.log("🏢 Account:", event.account);

  const permittedEvents: string[] = [
    "checkout.session.completed",
    "account.updated",
  ];

  const payload = await getPayload({
    config,
  });

  if (permittedEvents.includes(event.type)) {
    try {
      switch (event.type) {
        case "checkout.session.completed": {
          console.log("🔥 CHECKOUT SESSION COMPLETED - START");
          const data = event.data.object as Stripe.Checkout.Session;

          console.log("📝 Session data:", {
            id: data.id,
            metadata: data.metadata,
            payment_status: data.payment_status,
            status: data.status,
          });

          if (!data.metadata?.userId) {
            console.log("❌ Missing userId in metadata");
            throw new Error("User ID is required");
          }

          console.log("👤 Looking for user:", data.metadata.userId);
          const user = await payload.findByID({
            collection: "users",
            id: data.metadata.userId,
          });

          if (!user) {
            console.log("❌ User not found:", data.metadata.userId);
            throw new Error("User not found");
          }
          console.log("✅ User found:", user.id);

          console.log("🔍 Retrieving expanded session...");

          const expandedSession = await stripe.checkout.sessions.retrieve(
            data.id,
            {
              expand: ["line_items.data.price.product"],
            },
            {
              stripeAccount: event.account,
            }
          );

          if (
            !expandedSession.line_items?.data ||
            !expandedSession.line_items.data.length
          ) {
            console.log("❌ No line items found");
            throw new Error("No line items found in session");
          }

          const lineItems = expandedSession.line_items
            .data as ExpandedLineItem[];
          console.log("📦 Processing", lineItems.length, "line items");

          for (const [index, item] of lineItems.entries()) {
            console.log(`\n--- PROCESSING ITEM ${index + 1} ---`);

            const productId = item.price.product.id;

            console.log("🛍️ Item details:", {
              stripe_product_id: productId,
              stripe_product_name: item.price.product.name,
              price_id: item.price.id,
              quantity: item.quantity,
              amount: item.amount_total,
            });

            console.log("🔍 Looking for product in Payload using metadata...");

            const payloadProductId = item.price.product.metadata?.id;

            if (!payloadProductId) {
              console.log("❌ Missing product ID in metadata");
              throw new Error(
                `Product metadata missing ID for Stripe product: ${productId}`
              );
            }

            console.log(
              "📋 Using Payload product ID from metadata:",
              payloadProductId
            );

            const product = await payload.findByID({
              collection: "products",
              id: payloadProductId,
              depth: 1,
            });

            if (!product) {
              console.log("❌ Product not found in Payload:", productId);
              throw new Error(`Product not found: ${productId}`);
            }

            console.log("✅ Product found:", {
              id: product.id,
              name: product.name || "No name",
              tenant: product.tenant ? "Has tenant" : "No tenant",
            });

            if (!product.tenant) {
              console.log("❌ Product missing tenant:", product.id);
              throw new Error(
                `Product ${product.id} does not have an associated tenant`
              );
            }

            console.log("💾 Creating order...");

            const tenantId =
              typeof product.tenant === "string"
                ? product.tenant
                : product.tenant.id;

            console.log("🏢 Using tenant ID:", tenantId);

            const order = await payload.create({
              collection: "orders",
              data: {
                stripeCheckoutSessionId: data.id,
                user: user.id,
                product: product.id,
                name: item.price.product.name,
                tenant: tenantId,
                stripeAccountId: event.account,
              },
              overrideAccess: true,
            });

            console.log("✅ Order created:", order.id);
          }

          console.log("🎉 CHECKOUT SESSION COMPLETED - SUCCESS\n");
          break;
        }
        case "account.updated": {
          const data = event.data.object as Stripe.Account;

          await payload.update({
            collection: "tenants",
            where: {
              stripeAccountId: {
                equals: data.id,
              },
            },
            data: {
              stripeDetailsSubmitted: data.details_submitted,
            },
          });
          break;
        }
        default:
          console.log(`Unhandled event type: ${event.type}`);
          break;
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
