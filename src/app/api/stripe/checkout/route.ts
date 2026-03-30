import { NextRequest, NextResponse } from 'next/server';
// import { stripe } from '@/lib/stripe';
// import { auth } from '@/lib/auth';

interface CheckoutItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items } = body as { items: CheckoutItem[] };

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items provided for checkout' },
        { status: 400 }
      );
    }

    // TODO: Authenticate user
    // const session = await auth();
    // if (!session?.user?.id) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    // TODO: Replace with real Stripe checkout session
    // const stripeSession = await stripe.checkout.sessions.create({
    //   payment_method_types: ['card'],
    //   mode: 'payment',
    //   customer_email: session.user.email ?? undefined,
    //   metadata: {
    //     userId: session.user.id,
    //   },
    //   line_items: items.map((item) => ({
    //     price_data: {
    //       currency: 'usd',
    //       product_data: {
    //         name: item.name,
    //         description: `Size: ${item.size} | Color: ${item.color}`,
    //         images: [item.image],
    //       },
    //       unit_amount: Math.round(item.price * 100),
    //     },
    //     quantity: item.quantity,
    //   })),
    //   shipping_address_collection: {
    //     allowed_countries: ['US', 'CA', 'GB'],
    //   },
    //   success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    //   cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
    // });

    // Mock response
    const mockSessionId = `cs_mock_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

    return NextResponse.json({
      sessionId: mockSessionId,
      url: `/checkout/success?session_id=${mockSessionId}`,
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
