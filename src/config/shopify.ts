
// Shopify Configuration
// These values need to be set when integrating with your Shopify store

export interface ShopifyConfig {
  customBlindProductId: string;
  customBlindVariantId: string; // Keep for fallback
  remoteProductVariantId: string;
  smartHubProductVariantId: string;
  productPageUrl: string;
  appBaseUrl: string; // URL of your Shopify app for dynamic variants
  appApiKey: string; // API key for your app
}

// Default configuration - update these in production
export const shopifyConfig: ShopifyConfig = {
  // Main custom blind product ID (not variant ID)
  customBlindProductId: '1234567890123',
  
  // Fallback variant ID (base variant)
  customBlindVariantId: '12345678901234',
  
  // Remote control product variant ID
  remoteProductVariantId: '12345678901235',
  
  // SmartHub product variant ID
  smartHubProductVariantId: '12345678901236',
  
  // Product page URL to navigate back to
  productPageUrl: '/products/custom-blackout-blind',
  
  // Your Shopify app base URL for dynamic variant creation
  appBaseUrl: 'https://your-app.herokuapp.com',
  
  // API key for your Shopify app
  appApiKey: 'your-app-api-key',
};

// Function to update configuration from window object (for production)
export const initializeShopifyConfig = () => {
  if (typeof window !== 'undefined') {
    const config = (window as any).shopifyConfig;
    if (config) {
      Object.assign(shopifyConfig, config);
    }
  }
};
