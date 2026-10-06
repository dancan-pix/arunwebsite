import { Router, type IRouter, type Request, type Response } from 'express';
import { storage } from '../storage';
import { getUncachableStripeClient, getStripePublishableKey } from '../stripeClient';

const router: IRouter = Router();

function groupProductRows(rows: any[]) {
  const productsMap = new Map<string, any>();
  for (const row of rows) {
    if (!productsMap.has(row.product_id)) {
      productsMap.set(row.product_id, {
        id: row.product_id,
        name: row.product_name,
        description: row.product_description || null,
        active: row.product_active,
        images: row.product_images || [],
        metadata: row.product_metadata || {},
        prices: [],
      });
    }
    if (row.price_id) {
      productsMap.get(row.product_id).prices.push({
        id: row.price_id,
        unit_amount: row.unit_amount,
        currency: row.currency,
        recurring: row.recurring || null,
        active: row.price_active,
        metadata: row.price_metadata || {},
      });
    }
  }
  return Array.from(productsMap.values());
}

// List products with prices
router.get('/products', async (req: Request, res: Response) => {
  const rows = await storage.listProductsWithPrices();
  let products = groupProductRows(rows);

  const { category, featured } = req.query;
  if (category) {
    products = products.filter((p) => p.metadata?.category === category);
  }
  if (featured !== undefined) {
    const featuredBool = featured === 'true';
    products = products.filter((p) => (p.metadata?.featured === 'true') === featuredBool);
  }

  res.json({ data: products });
});

// Get single product
router.get('/products/:productId', async (req: Request, res: Response) => {
  const { productId } = req.params;
  const rows = await storage.getProductWithPrices(productId);

  if (!rows.length) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const products = groupProductRows(rows);
  res.json(products[0]);
});

// Store stats
router.get('/store/stats', async (_req: Request, res: Response) => {
  const [totalProducts, categoryRows] = await Promise.all([
    storage.countActiveProducts(),
    storage.getProductsGroupedByCategory(),
  ]);

  const categories = (categoryRows as any[]).map((r) => ({
    name: r.category as string,
    count: Number(r.count),
  }));

  const featuredCount = (await storage.listProducts()).filter(
    (p: any) => p.metadata?.featured === 'true'
  ).length;

  res.json({ totalProducts, categories, featuredCount });
});

// Get Stripe publishable key
router.get('/checkout/publishable-key', async (_req: Request, res: Response) => {
  const publishableKey = await getStripePublishableKey();
  res.json({ publishableKey });
});

// Create checkout session
router.post('/checkout/session', async (req: Request, res: Response) => {
  const { priceId, successUrl, cancelUrl } = req.body;

  if (!priceId || !successUrl || !cancelUrl) {
    return res.status(400).json({ error: 'priceId, successUrl, and cancelUrl are required' });
  }

  const stripe = await getUncachableStripeClient();
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  res.json({ url: session.url!, sessionId: session.id });
});

export default router;
