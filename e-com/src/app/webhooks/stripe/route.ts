import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_WEBHOOK_SECRET as string);

export const POST = async (req: NextRequest) => {
    const event = await stripe.webhooks.constructEvent(
        await req.text(),
        req.headers.get("stripe-signature") as string,
        process.env.STRIPE_WEBHOOK_SECRET as string
    );

    if (event.type === "charge.succeeded") {
        const charge = event.data.object;
        const productId = charge.metadata.productId;
        const email = charge.billing_details.email;
        const pricePaidInCents = charge.amount;

        const product = await db.product.findUnique({
            where: { id: productId },
        });

        if (!product || !email) {
            return new NextResponse("Bad Request", {
                status: 400,
            });
        }

        const userFields = {
            email,
            orders: { create: { productId, pricePaidInCents } },
        };
        const {
            orders: [order],
        } = await db.user.upsert({
            where: { email },
            create: userFields,
            update: userFields,
            select: { orders: { orderBy: { createdAt: "desc" }, take: 1 } },
        });
    }
};
