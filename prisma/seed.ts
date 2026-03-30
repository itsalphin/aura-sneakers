import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // --- Clean existing data ---
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.productSize.deleteMany();
  await prisma.productColor.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.address.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  console.log('Cleared existing data.');

  // --- Categories ---
  const running = await prisma.category.create({
    data: { name: 'Running', slug: 'running', image: '/images/categories/running.jpg' },
  });
  const lifestyle = await prisma.category.create({
    data: { name: 'Lifestyle', slug: 'lifestyle', image: '/images/categories/lifestyle.jpg' },
  });
  const basketball = await prisma.category.create({
    data: { name: 'Basketball', slug: 'basketball', image: '/images/categories/basketball.jpg' },
  });
  const limited = await prisma.category.create({
    data: { name: 'Limited Edition', slug: 'limited-edition', image: '/images/categories/limited-edition.jpg' },
  });

  console.log('Created categories.');

  // --- Helper: create sizes ---
  function buildSizes(outOfStock: number[] = []) {
    return Array.from({ length: 7 }, (_, i) => {
      const sizeNum = 7 + i;
      return { size: sizeNum.toString(), inStock: !outOfStock.includes(sizeNum) };
    });
  }

  // --- Products ---
  const productsData = [
    {
      name: 'AURA Phantom X1',
      slug: 'aura-phantom-x1',
      description: 'Disappear into the night. The Phantom X1 fuses stealth aesthetics with cloud-like cushioning for those who move in silence.',
      price: 220,
      comparePrice: 280,
      images: ['/images/products/phantom-x1.jpg', '/images/products/phantom-x1-2.jpg'],
      brand: 'AURA',
      categoryId: running.id,
      featured: true,
      inStock: true,
      tags: ['new', 'bestseller'],
      sizes: buildSizes([11]),
      colors: [
        { name: 'Black', hex: '#000000', images: ['/images/products/phantom-x1-black.jpg'] },
        { name: 'White', hex: '#FFFFFF', images: ['/images/products/phantom-x1-white.jpg'] },
        { name: 'Volt', hex: '#CDFF00', images: ['/images/products/phantom-x1-volt.jpg'] },
      ],
    },
    {
      name: 'AURA Velocity Pro',
      slug: 'aura-velocity-pro',
      description: 'Engineered for speed without compromise. Carbon-plated responsiveness meets breathable knit construction.',
      price: 310,
      comparePrice: 350,
      images: ['/images/products/velocity-pro.jpg'],
      brand: 'AURA',
      categoryId: running.id,
      featured: true,
      inStock: true,
      tags: ['new'],
      sizes: buildSizes([7, 13]),
      colors: [
        { name: 'Crimson', hex: '#DC143C', images: ['/images/products/velocity-pro-crimson.jpg'] },
        { name: 'Black', hex: '#000000', images: ['/images/products/velocity-pro-black.jpg'] },
      ],
    },
    {
      name: 'AURA Shadow Runner',
      slug: 'aura-shadow-runner',
      description: 'The streets are your runway. Shadow Runner delivers all-day comfort wrapped in a design that commands attention.',
      price: 185,
      images: ['/images/products/shadow-runner.jpg'],
      brand: 'AURA',
      categoryId: lifestyle.id,
      featured: true,
      inStock: true,
      tags: ['bestseller'],
      sizes: buildSizes([9]),
      colors: [
        { name: 'Navy', hex: '#1B1B3A', images: ['/images/products/shadow-runner-navy.jpg'] },
        { name: 'White', hex: '#FFFFFF', images: ['/images/products/shadow-runner-white.jpg'] },
        { name: 'Black', hex: '#000000', images: ['/images/products/shadow-runner-black.jpg'] },
      ],
    },
    {
      name: 'AURA Eclipse Max',
      slug: 'aura-eclipse-max',
      description: 'Maximum impact. Maximum comfort. The Eclipse Max features triple-density cushioning and a bold silhouette that owns the court.',
      price: 275,
      comparePrice: 320,
      images: ['/images/products/eclipse-max.jpg'],
      brand: 'AURA',
      categoryId: basketball.id,
      featured: true,
      inStock: true,
      tags: ['new', 'bestseller'],
      sizes: buildSizes([8, 12]),
      colors: [
        { name: 'Black', hex: '#000000', images: ['/images/products/eclipse-max-black.jpg'] },
        { name: 'Crimson', hex: '#DC143C', images: ['/images/products/eclipse-max-crimson.jpg'] },
      ],
    },
    {
      name: 'AURA Nebula GT',
      slug: 'aura-nebula-gt',
      description: 'Born from the cosmos. The Nebula GT features iridescent accents and a gravity-defying sole unit for a ride that feels otherworldly.',
      price: 450,
      images: ['/images/products/nebula-gt.jpg'],
      brand: 'AURA',
      categoryId: limited.id,
      featured: true,
      inStock: true,
      tags: ['limited', 'new'],
      sizes: buildSizes([7, 10, 13]),
      colors: [
        { name: 'Void Black', hex: '#0A0A0A', images: ['/images/products/nebula-gt-void.jpg'] },
        { name: 'Nebula Purple', hex: '#7B2FBE', images: ['/images/products/nebula-gt-purple.jpg'] },
      ],
    },
    {
      name: 'AURA Titan Force',
      slug: 'aura-titan-force',
      description: 'Dominate the paint. The Titan Force provides ankle-locking support and explosive responsiveness for the modern power player.',
      price: 245,
      images: ['/images/products/titan-force.jpg'],
      brand: 'AURA',
      categoryId: basketball.id,
      featured: false,
      inStock: true,
      tags: ['bestseller'],
      sizes: buildSizes([]),
      colors: [
        { name: 'White', hex: '#FFFFFF', images: ['/images/products/titan-force-white.jpg'] },
        { name: 'Black', hex: '#000000', images: ['/images/products/titan-force-black.jpg'] },
        { name: 'Volt', hex: '#CDFF00', images: ['/images/products/titan-force-volt.jpg'] },
      ],
    },
    {
      name: 'AURA Prism Elite',
      slug: 'aura-prism-elite',
      description: 'Light bends around you. The Prism Elite captures every angle with reflective detailing and a featherweight build.',
      price: 340,
      comparePrice: 400,
      images: ['/images/products/prism-elite.jpg'],
      brand: 'AURA',
      categoryId: limited.id,
      featured: true,
      inStock: true,
      tags: ['limited'],
      sizes: buildSizes([8]),
      colors: [
        { name: 'Silver', hex: '#C0C0C0', images: ['/images/products/prism-elite-silver.jpg'] },
        { name: 'Black', hex: '#000000', images: ['/images/products/prism-elite-black.jpg'] },
      ],
    },
    {
      name: 'AURA Quantum Leap',
      slug: 'aura-quantum-leap',
      description: 'Defy physics. The Quantum Leap is our most advanced running shoe, featuring adaptive foam that learns your stride.',
      price: 380,
      images: ['/images/products/quantum-leap.jpg'],
      brand: 'AURA',
      categoryId: running.id,
      featured: true,
      inStock: true,
      tags: ['new'],
      sizes: buildSizes([12, 13]),
      colors: [
        { name: 'Navy', hex: '#1B1B3A', images: ['/images/products/quantum-leap-navy.jpg'] },
        { name: 'Volt', hex: '#CDFF00', images: ['/images/products/quantum-leap-volt.jpg'] },
      ],
    },
    {
      name: 'AURA Drift Carbon',
      slug: 'aura-drift-carbon',
      description: 'Carbon fiber meets street style. The Drift Carbon is a lightweight lifestyle shoe with a racing-inspired sole plate.',
      price: 195,
      images: ['/images/products/drift-carbon.jpg'],
      brand: 'AURA',
      categoryId: lifestyle.id,
      featured: false,
      inStock: true,
      tags: ['new'],
      sizes: buildSizes([]),
      colors: [
        { name: 'Carbon Grey', hex: '#555555', images: ['/images/products/drift-carbon-grey.jpg'] },
        { name: 'Black', hex: '#000000', images: ['/images/products/drift-carbon-black.jpg'] },
        { name: 'White', hex: '#FFFFFF', images: ['/images/products/drift-carbon-white.jpg'] },
      ],
    },
    {
      name: 'AURA Blaze Runner',
      slug: 'aura-blaze-runner',
      description: 'Set the track on fire. The Blaze Runner combines aggressive traction with a fiery design language built for tempo runs.',
      price: 265,
      comparePrice: 300,
      images: ['/images/products/blaze-runner.jpg'],
      brand: 'AURA',
      categoryId: running.id,
      featured: false,
      inStock: true,
      tags: ['sale'],
      sizes: buildSizes([7]),
      colors: [
        { name: 'Flame Orange', hex: '#FF4500', images: ['/images/products/blaze-runner-orange.jpg'] },
        { name: 'Black', hex: '#000000', images: ['/images/products/blaze-runner-black.jpg'] },
      ],
    },
    {
      name: 'AURA Nova Court',
      slug: 'aura-nova-court',
      description: 'A new star on the court. The Nova Court provides lateral stability and forefoot bounce for quick-cutting guards.',
      price: 230,
      images: ['/images/products/nova-court.jpg'],
      brand: 'AURA',
      categoryId: basketball.id,
      featured: false,
      inStock: true,
      tags: ['new'],
      sizes: buildSizes([13]),
      colors: [
        { name: 'White', hex: '#FFFFFF', images: ['/images/products/nova-court-white.jpg'] },
        { name: 'Royal Blue', hex: '#4169E1', images: ['/images/products/nova-court-blue.jpg'] },
      ],
    },
    {
      name: 'AURA Zenith Pro',
      slug: 'aura-zenith-pro',
      description: 'The pinnacle of performance. The Zenith Pro is our marathon racer, weighing in at just 6.2 oz with maximum energy return.',
      price: 350,
      images: ['/images/products/zenith-pro.jpg'],
      brand: 'AURA',
      categoryId: running.id,
      featured: true,
      inStock: true,
      tags: ['new', 'bestseller'],
      sizes: buildSizes([7, 8]),
      colors: [
        { name: 'Neon Green', hex: '#39FF14', images: ['/images/products/zenith-pro-green.jpg'] },
        { name: 'Black', hex: '#000000', images: ['/images/products/zenith-pro-black.jpg'] },
        { name: 'White', hex: '#FFFFFF', images: ['/images/products/zenith-pro-white.jpg'] },
      ],
    },
    {
      name: 'AURA Flux Trainer',
      slug: 'aura-flux-trainer',
      description: 'Adapt to any workout. The Flux Trainer features a flexible outsole and breathable mesh upper built for cross-training versatility.',
      price: 155,
      images: ['/images/products/flux-trainer.jpg'],
      brand: 'AURA',
      categoryId: lifestyle.id,
      featured: false,
      inStock: true,
      tags: ['bestseller'],
      sizes: buildSizes([]),
      colors: [
        { name: 'Cool Grey', hex: '#8C8C8C', images: ['/images/products/flux-trainer-grey.jpg'] },
        { name: 'Black', hex: '#000000', images: ['/images/products/flux-trainer-black.jpg'] },
      ],
    },
    {
      name: 'AURA Apex Max',
      slug: 'aura-apex-max',
      description: 'Rise above the rim. The Apex Max features a full-length Air unit and reinforced ankle collar for high-flying performance.',
      price: 290,
      comparePrice: 340,
      images: ['/images/products/apex-max.jpg'],
      brand: 'AURA',
      categoryId: basketball.id,
      featured: true,
      inStock: true,
      tags: ['new', 'bestseller'],
      sizes: buildSizes([7, 11]),
      colors: [
        { name: 'Black', hex: '#000000', images: ['/images/products/apex-max-black.jpg'] },
        { name: 'White', hex: '#FFFFFF', images: ['/images/products/apex-max-white.jpg'] },
        { name: 'University Red', hex: '#E31837', images: ['/images/products/apex-max-red.jpg'] },
      ],
    },
    {
      name: 'AURA Storm Runner',
      slug: 'aura-storm-runner',
      description: 'No weather stops you. The Storm Runner features a waterproof membrane and aggressive all-terrain traction for trail running.',
      price: 285,
      images: ['/images/products/storm-runner.jpg'],
      brand: 'AURA',
      categoryId: running.id,
      featured: false,
      inStock: true,
      tags: ['new'],
      sizes: buildSizes([13]),
      colors: [
        { name: 'Slate Grey', hex: '#708090', images: ['/images/products/storm-runner-grey.jpg'] },
        { name: 'Forest Green', hex: '#228B22', images: ['/images/products/storm-runner-green.jpg'] },
      ],
    },
    {
      name: 'AURA Vortex Elite',
      slug: 'aura-vortex-elite',
      description: 'Spin past defenders. The Vortex Elite combines torsional rigidity with a plush collar for ankle-breaking moves on hardwood.',
      price: 260,
      images: ['/images/products/vortex-elite.jpg'],
      brand: 'AURA',
      categoryId: basketball.id,
      featured: false,
      inStock: true,
      tags: ['sale'],
      sizes: buildSizes([8]),
      colors: [
        { name: 'Black', hex: '#000000', images: ['/images/products/vortex-elite-black.jpg'] },
        { name: 'Gold', hex: '#FFD700', images: ['/images/products/vortex-elite-gold.jpg'] },
      ],
    },
    {
      name: 'AURA Pulse GT',
      slug: 'aura-pulse-gt',
      description: 'Feel the rhythm of the road. The Pulse GT delivers a connected ground feel with responsive cushioning for tempo and speed work.',
      price: 200,
      images: ['/images/products/pulse-gt.jpg'],
      brand: 'AURA',
      categoryId: running.id,
      featured: false,
      inStock: true,
      tags: ['bestseller'],
      sizes: buildSizes([7, 12]),
      colors: [
        { name: 'Electric Blue', hex: '#0892D0', images: ['/images/products/pulse-gt-blue.jpg'] },
        { name: 'Black', hex: '#000000', images: ['/images/products/pulse-gt-black.jpg'] },
        { name: 'White', hex: '#FFFFFF', images: ['/images/products/pulse-gt-white.jpg'] },
      ],
    },
    {
      name: 'AURA Stealth Pro',
      slug: 'aura-stealth-pro',
      description: 'Move unseen. The Stealth Pro wraps your foot in matte-finish materials with a whisper-quiet outsole for understated luxury.',
      price: 375,
      images: ['/images/products/stealth-pro.jpg'],
      brand: 'AURA',
      categoryId: limited.id,
      featured: true,
      inStock: true,
      tags: ['limited', 'new'],
      sizes: buildSizes([7, 10, 13]),
      colors: [
        { name: 'Matte Black', hex: '#1A1A1A', images: ['/images/products/stealth-pro-black.jpg'] },
        { name: 'Charcoal', hex: '#36454F', images: ['/images/products/stealth-pro-charcoal.jpg'] },
      ],
    },
    {
      name: 'AURA Ridge Walker',
      slug: 'aura-ridge-walker',
      description: 'Conquer any terrain. The Ridge Walker is a rugged lifestyle boot with Vibram outsole and premium suede construction.',
      price: 215,
      images: ['/images/products/ridge-walker.jpg'],
      brand: 'AURA',
      categoryId: lifestyle.id,
      featured: false,
      inStock: true,
      tags: ['new'],
      sizes: buildSizes([]),
      colors: [
        { name: 'Sand', hex: '#C2B280', images: ['/images/products/ridge-walker-sand.jpg'] },
        { name: 'Black', hex: '#000000', images: ['/images/products/ridge-walker-black.jpg'] },
        { name: 'Olive', hex: '#556B2F', images: ['/images/products/ridge-walker-olive.jpg'] },
      ],
    },
    {
      name: 'AURA Cosmic Fly',
      slug: 'aura-cosmic-fly',
      description: 'Transcend gravity. The Cosmic Fly is our most exclusive release, featuring hand-painted galaxy artwork and zero-gravity foam technology.',
      price: 425,
      images: ['/images/products/cosmic-fly.jpg'],
      brand: 'AURA',
      categoryId: limited.id,
      featured: true,
      inStock: true,
      tags: ['limited', 'new', 'bestseller'],
      sizes: buildSizes([7, 8, 12, 13]),
      colors: [
        { name: 'Galaxy', hex: '#1C1C3A', images: ['/images/products/cosmic-fly-galaxy.jpg'] },
        { name: 'Aurora', hex: '#7DF9FF', images: ['/images/products/cosmic-fly-aurora.jpg'] },
      ],
    },
    {
      name: 'AURA Drift Low',
      slug: 'aura-drift-low',
      description: 'Effortless style meets everyday comfort. The Drift Low is a wardrobe staple for those who keep it clean.',
      price: 145,
      images: ['/images/products/drift-low.jpg'],
      brand: 'AURA',
      categoryId: lifestyle.id,
      featured: false,
      inStock: true,
      tags: ['bestseller'],
      sizes: buildSizes([]),
      colors: [
        { name: 'White', hex: '#FFFFFF', images: ['/images/products/drift-low-white.jpg'] },
        { name: 'Black', hex: '#000000', images: ['/images/products/drift-low-black.jpg'] },
        { name: 'Cream', hex: '#FFFDD0', images: ['/images/products/drift-low-cream.jpg'] },
      ],
    },
    {
      name: 'AURA Obsidian OG',
      slug: 'aura-obsidian-og',
      description: 'Where it all began. The Obsidian OG is a re-release of our founding silhouette, crafted in premium materials for the purist.',
      price: 420,
      images: ['/images/products/obsidian-og.jpg'],
      brand: 'AURA',
      categoryId: limited.id,
      featured: true,
      inStock: true,
      tags: ['limited', 'bestseller'],
      sizes: buildSizes([7, 8, 12, 13]),
      colors: [
        { name: 'Obsidian', hex: '#0B1215', images: ['/images/products/obsidian-og-obsidian.jpg'] },
        { name: 'Bone', hex: '#E3DAC9', images: ['/images/products/obsidian-og-bone.jpg'] },
      ],
    },
    {
      name: 'AURA Zero Gravity',
      slug: 'aura-zero-gravity',
      description: 'Feel nothing but speed. The Zero Gravity strips away everything unnecessary, leaving pure performance in a minimal package.',
      price: 290,
      images: ['/images/products/zero-gravity.jpg'],
      brand: 'AURA',
      categoryId: running.id,
      featured: false,
      inStock: true,
      tags: ['new', 'sale'],
      sizes: buildSizes([13]),
      colors: [
        { name: 'Crimson', hex: '#DC143C', images: ['/images/products/zero-gravity-crimson.jpg'] },
        { name: 'Black', hex: '#000000', images: ['/images/products/zero-gravity-black.jpg'] },
      ],
    },
    {
      name: 'AURA Apex Mid',
      slug: 'aura-apex-mid',
      description: 'Reach new heights. The Apex Mid delivers locked-in midfoot support with a striking profile built for the court.',
      price: 230,
      comparePrice: 270,
      images: ['/images/products/apex-mid.jpg'],
      brand: 'AURA',
      categoryId: basketball.id,
      featured: false,
      inStock: true,
      tags: ['sale'],
      sizes: buildSizes([7, 11]),
      colors: [
        { name: 'Black', hex: '#000000', images: ['/images/products/apex-mid-black.jpg'] },
        { name: 'White', hex: '#FFFFFF', images: ['/images/products/apex-mid-white.jpg'] },
      ],
    },
    {
      name: 'AURA Ember Glow',
      slug: 'aura-ember-glow',
      description: 'Warmth meets performance. The Ember Glow features a thermoregulating lining and reflective accents for cold-weather runs.',
      price: 175,
      images: ['/images/products/ember-glow.jpg'],
      brand: 'AURA',
      categoryId: running.id,
      featured: false,
      inStock: true,
      tags: ['sale'],
      sizes: buildSizes([7, 13]),
      colors: [
        { name: 'Ember Red', hex: '#8B0000', images: ['/images/products/ember-glow-red.jpg'] },
        { name: 'Black', hex: '#000000', images: ['/images/products/ember-glow-black.jpg'] },
        { name: 'Grey', hex: '#808080', images: ['/images/products/ember-glow-grey.jpg'] },
      ],
    },
  ];

  for (const product of productsData) {
    const { sizes, colors, ...productData } = product;

    await prisma.product.create({
      data: {
        ...productData,
        sizes: {
          create: sizes,
        },
        colors: {
          create: colors,
        },
      },
    });
  }

  console.log(`Created ${productsData.length} products.`);

  // --- Test User ---
  const hashedPassword = await bcrypt.hash('admin123', 12);

  await prisma.user.create({
    data: {
      name: 'AURA Admin',
      email: 'admin@aura.com',
      password: hashedPassword,
      role: 'ADMIN',
      addresses: {
        create: {
          fullName: 'AURA Admin',
          addressLine1: '123 Sneaker Street',
          city: 'Los Angeles',
          state: 'CA',
          postalCode: '90001',
          country: 'US',
          phone: '+1 (555) 123-4567',
          isDefault: true,
        },
      },
    },
  });

  console.log('Created test user: admin@aura.com');
  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
