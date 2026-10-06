import { db } from '@workspace/db';
import { sql } from 'drizzle-orm';

export class Storage {
  async getProduct(productId: string) {
    const result = await db.execute(
      sql`SELECT * FROM stripe.products WHERE id = ${productId}`
    );
    return result.rows[0] || null;
  }

  async listProducts(active = true, limit = 100, offset = 0) {
    const result = await db.execute(
      sql`SELECT * FROM stripe.products WHERE active = ${active} ORDER BY name LIMIT ${limit} OFFSET ${offset}`
    );
    return result.rows;
  }

  async listProductsWithPrices(active = true, limit = 100, offset = 0) {
    const result = await db.execute(
      sql`
        WITH paginated_products AS (
          SELECT id, name, description, metadata, active, images
          FROM stripe.products
          WHERE active = ${active}
          ORDER BY name
          LIMIT ${limit} OFFSET ${offset}
        )
        SELECT
          p.id as product_id,
          p.name as product_name,
          p.description as product_description,
          p.active as product_active,
          p.metadata as product_metadata,
          p.images as product_images,
          pr.id as price_id,
          pr.unit_amount,
          pr.currency,
          pr.recurring,
          pr.active as price_active,
          pr.metadata as price_metadata
        FROM paginated_products p
        LEFT JOIN stripe.prices pr ON pr.product = p.id AND pr.active = true
        ORDER BY p.name, pr.unit_amount
      `
    );
    return result.rows;
  }

  async getProductWithPrices(productId: string) {
    const result = await db.execute(
      sql`
        SELECT
          p.id as product_id,
          p.name as product_name,
          p.description as product_description,
          p.active as product_active,
          p.metadata as product_metadata,
          p.images as product_images,
          pr.id as price_id,
          pr.unit_amount,
          pr.currency,
          pr.recurring,
          pr.active as price_active,
          pr.metadata as price_metadata
        FROM stripe.products p
        LEFT JOIN stripe.prices pr ON pr.product = p.id AND pr.active = true
        WHERE p.id = ${productId}
      `
    );
    return result.rows;
  }

  async getPrice(priceId: string) {
    const result = await db.execute(
      sql`SELECT * FROM stripe.prices WHERE id = ${priceId}`
    );
    return result.rows[0] || null;
  }

  async countActiveProducts() {
    const result = await db.execute(
      sql`SELECT COUNT(*) as count FROM stripe.products WHERE active = true`
    );
    return Number((result.rows[0] as any)?.count || 0);
  }

  async getProductsGroupedByCategory() {
    const result = await db.execute(
      sql`
        SELECT
          COALESCE(metadata->>'category', 'General') as category,
          COUNT(*) as count
        FROM stripe.products
        WHERE active = true
        GROUP BY COALESCE(metadata->>'category', 'General')
        ORDER BY count DESC
      `
    );
    return result.rows;
  }
}

export const storage = new Storage();
