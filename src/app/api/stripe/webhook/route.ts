import { NextRequest, NextResponse } from 'next/server';
// import { stripe } from '@/lib/stripe';
// import { prisma } from '@/lib/prisma';

// Stripe sends raw body, so we need to disable the default body parser
// export const config = { api: { bodyParser: false } };

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    // TODO: Replace with real Stripe webhook verification
    // const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
    // let event: Stripe.Event;
    //
    // try {
    //   event = stripe.webhooks.constructEvent(body, signature!, webhookSecret);
    // } catch (err) {
    //   console.error('Webhook signature verification failed:', err);
    //   return NextResponse.json(
    //     { error: 'Webhook signature verification failed' },
    //     { status: 400 }
    //   );
    // }

    // Mock: parse the body as JSON for development
    let event: { type: string; data: { object: Record<string, unknown> } };
    try {
      event = JSON.parse(body);
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 }
      );
    }

    console.log(`[Stripe Webhook] Received event: ${event.type}`);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        console.log('[Stripe Webhook] Checkout session completed:', session);

        // TODO: Fulfill the order
        // const userId = session.metadata?.userId;
        // const order = await prisma.order.update({
        //   where: { stripePaymentIntentId: session.payment_intent as string },
        //   data: {
        //     status: 'CONFIRMED',
        //   },
        // });

        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        console.log('[Stripe Webhook] Payment intent succeeded:', paymentIntent);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;
        console.log('[Stripe Webhook] Payment failed:', paymentIntent);

        // TODO: Update order status
        // await prisma.order.update({
        //   where: { stripePaymentIntentId: paymentIntent.id as string },
        //   data: { status: 'CANCELLED' },
        // });

        break;
      }

      default:
        console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
