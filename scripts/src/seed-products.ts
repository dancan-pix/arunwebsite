import { getUncachableStripeClient } from './stripeClient';

async function createProducts() {
  try {
    const stripe = await getUncachableStripeClient();
    console.log('Creating sample digital products in Stripe...');

    const productsToCreate = [
      {
        name: 'EB-2 NIW Course',
        description: 'A comprehensive self-petitioning course covering the National Interest Waiver process step by step. Includes document templates, petition letter examples, and strategy guides.',
        metadata: {
          category: 'courses',
          featured: 'true',
          shortDescription: 'Complete EB-2 NIW self-petitioning course with templates and guides.',
        },
        price: 29700,
      },
      {
        name: 'EB-1A Course',
        description: 'Everything you need to prepare and submit an EB-1A extraordinary ability petition. Covers eligibility criteria, evidence building, and writing a compelling petition.',
        metadata: {
          category: 'courses',
          featured: 'true',
          shortDescription: 'Full EB-1A petition preparation course with real examples.',
        },
        price: 29700,
      },
      {
        name: 'AI Petition Review Tool',
        description: 'An AI-powered assistant that reviews your draft petition and support letters, provides detailed feedback, and suggests improvements to strengthen your case.',
        metadata: {
          category: 'tools',
          featured: 'true',
          shortDescription: 'AI tool to review and improve your petition documents.',
        },
        price: 4900,
      },
      {
        name: 'RFE Response Course',
        description: 'A targeted course on responding to Requests for Evidence (RFE) for EB-2 NIW petitions. Learn how to address common RFE types and strengthen your case under scrutiny.',
        metadata: {
          category: 'courses',
          featured: 'false',
          shortDescription: 'How to effectively respond to EB-2 NIW RFEs.',
        },
        price: 19700,
      },
      {
        name: 'Intro to Immigration Profile Building',
        description: 'A starter guide to building your immigration profile for EB-2 NIW and EB-1A. Understand what evidence matters and how to systematically build your case over time.',
        metadata: {
          category: 'courses',
          featured: 'false',
          shortDescription: 'Build your immigration profile for NIW and EB-1A petitions.',
        },
        price: 9700,
      },
    ];

    for (const item of productsToCreate) {
      const existing = await stripe.products.search({
        query: `name:'${item.name}' AND active:'true'`,
      });

      if (existing.data.length > 0) {
        console.log(`"${item.name}" already exists, skipping.`);
        continue;
      }

      const product = await stripe.products.create({
        name: item.name,
        description: item.description,
        metadata: item.metadata,
      });

      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: item.price,
        currency: 'usd',
      });

      console.log(`Created: ${product.name} at $${(item.price / 100).toFixed(2)} (${price.id})`);
    }

    console.log('Done! Webhooks will sync these products to the database automatically.');
  } catch (error: any) {
    console.error('Error creating products:', error.message);
    process.exit(1);
  }
}

createProducts();
