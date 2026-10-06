import { runMigrations } from 'stripe-replit-sync';
import { getStripeSync } from "./stripeClient";
import app from "./app";
import { logger } from "./lib/logger";

// Public https origin of this deployment, used to register the Stripe webhook.
function getPublicUrl() {
  const explicit = process.env.PUBLIC_URL ?? process.env.RENDER_EXTERNAL_URL;
  if (explicit) {
    return explicit.replace(/\/+$/, '');
  }

  const replitDomain = process.env.REPLIT_DOMAINS?.split(',')[0];
  return replitDomain ? `https://${replitDomain}` : undefined;
}

async function initStripe() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is required for Stripe integration.');
  }

  try {
    logger.info('Initializing Stripe schema...');
    await runMigrations({ databaseUrl, schema: 'stripe' });
    logger.info('Stripe schema ready');

    const stripeSync = await getStripeSync();

    const webhookBaseUrl = getPublicUrl();
    if (webhookBaseUrl) {
      logger.info('Setting up managed webhook...');
      await stripeSync.findOrCreateManagedWebhook(`${webhookBaseUrl}/api/stripe/webhook`);
      logger.info('Webhook configured');
    } else {
      logger.warn('PUBLIC_URL is not set; skipping Stripe webhook setup. Products will only sync on startup.');
    }

    // Sync existing data in the background — don't block server start
    stripeSync.syncBackfill()
      .then(() => logger.info('Stripe data synced'))
      .catch((err: any) => logger.error({ err }, 'Error syncing Stripe data'));
  } catch (error) {
    logger.error({ err: error }, 'Failed to initialize Stripe');
    throw error;
  }
}

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error("PORT environment variable is required but was not provided.");
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

await initStripe();

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }
  logger.info({ port }, "Server listening");
});
