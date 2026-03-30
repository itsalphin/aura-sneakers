import { NextRequest, NextResponse } from 'next/server';
import { OrderStatus } from '@/types/order';

const mockOrders = [
  {
    id: 'order-1',
    orderNumber: 'AURA-M1K2X3-AB4C',
    userId: 'user-1',
    status: OrderStatus.DELIVERED,
    items: [
      {
        id: 'oi-1',
        orderId: 'order-1',
        productId: 'prod-1',
        name: 'AURA Phantom X1',
        price: 220,
        image: '/images/products/phantom-x1.jpg',
        size: '10',
        color: 'Black',
        quantity: 1,
      },
    ],
    subtotal: 220,
    tax: 19.80,
    shipping: 0,
    total: 239.80,
    shippingAddress: {
      id: 'addr-1',
      fullName: 'John Doe',
      addressLine1: '123 Sneaker Street',
      city: 'Los Angeles',
      state: 'CA',
      postalCode: '90001',
      country: 'US',
      phone: '+1 (555) 123-4567',
    },
    trackingNumber: '1Z999AA10123456784',
    createdAt: new Date('2025-11-15'),
    updatedAt: new Date('2025-11-20'),
  },
  {
    id: 'order-2',
    orderNumber: 'AURA-N5P7Q8-DE9F',
    userId: 'user-1',
    status: OrderStatus.SHIPPED,
    items: [
      {
        id: 'oi-2',
        orderId: 'order-2',
        productId: 'prod-5',
        name: 'AURA Nebula GT',
        price: 450,
        image: '/images/products/nebula-gt.jpg',
        size: '9',
        color: 'Nebula Purple',
        quantity: 1,
      },
      {
        id: 'oi-3',
        orderId: 'order-2',
        productId: 'prod-3',
        name: 'AURA Shadow Runner',
        price: 185,
        image: '/images/products/shadow-runner.jpg',
        size: '10',
        color: 'Navy',
        quantity: 1,
      },
    ],
    subtotal: 635,
    tax: 57.15,
    shipping: 0,
    total: 692.15,
    shippingAddress: {
      id: 'addr-1',
      fullName: 'John Doe',
      addressLine1: '123 Sneaker Street',
      city: 'Los Angeles',
      state: 'CA',
      postalCode: '90001',
      country: 'US',
      phone: '+1 (555) 123-4567',
    },
    trackingNumber: '1Z999AA10987654321',
    createdAt: new Date('2025-12-20'),
    updatedAt: new Date('2025-12-22'),
  },
  {
    id: 'order-3',
    orderNumber: 'AURA-R2S4T6-GH1J',
    userId: 'user-1',
    status: OrderStatus.PROCESSING,
    items: [
      {
        id: 'oi-4',
        orderId: 'order-3',
        productId: 'prod-7',
        name: 'AURA Prism Elite',
        price: 340,
        image: '/images/products/prism-elite.jpg',
        size: '11',
        color: 'Silver',
        quantity: 1,
      },
    ],
    subtotal: 340,
    tax: 30.60,
    shipping: 12.99,
    total: 383.59,
    shippingAddress: {
      id: 'addr-2',
      fullName: 'John Doe',
      addressLine1: '456 Hype Ave',
      addressLine2: 'Apt 7B',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'US',
      phone: '+1 (555) 987-6543',
    },
    createdAt: new Date('2026-01-05'),
    updatedAt: new Date('2026-01-05'),
  },
];

export async function GET() {
  try {
    // TODO: Replace with Prisma query
    // const session = await auth();
    // if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // const orders = await prisma.order.findMany({
    //   where: { userId: session.user.id },
    //   include: { items: true, shippingAddress: true },
    //   orderBy: { createdAt: 'desc' },
    // });

    return NextResponse.json({ orders: mockOrders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, shippingAddress } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Order must contain at least one item' },
        { status: 400 }
      );
    }

    if (!shippingAddress) {
      return NextResponse.json(
        { error: 'Shipping address is required' },
        { status: 400 }
      );
    }

    const subtotal = items.reduce(
      (sum: number, item: { price: number; quantity: number }) =>
        sum + item.price * item.quantity,
      0
    );
    const tax = Math.round(subtotal * 0.09 * 100) / 100;
    const shipping = subtotal >= 200 ? 0 : 12.99;
    const total = Math.round((subtotal + tax + shipping) * 100) / 100;

    const orderNumber = `AURA-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // TODO: Replace with Prisma query
    // const session = await auth();
    // if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // const order = await prisma.order.create({
    //   data: {
    //     orderNumber,
    //     userId: session.user.id,
    //     status: 'PENDING',
    //     subtotal,
    //     tax,
    //     shipping,
    //     total,
    //     items: { create: items },
    //     shippingAddress: { connect: { id: shippingAddress.id } },
    //   },
    //   include: { items: true, shippingAddress: true },
    // });

    const mockOrder = {
      id: `order-${Date.now()}`,
      orderNumber,
      userId: 'user-1',
      status: OrderStatus.PENDING,
      items,
      subtotal,
      tax,
      shipping,
      total,
      shippingAddress,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return NextResponse.json({
      success: true,
      order: mockOrder,
      message: 'Order created successfully',
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
