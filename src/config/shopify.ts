
// Shopify Configuration
// These values need to be set when integrating with your Shopify store

export interface ShopifyConfig {
  customBlindVariantId: string;
  remoteProductVariantId: string;
  smartHubProductVariantId: string;
  productPageUrl: string;
}

// Default configuration - update these in production
export const shopifyConfig: ShopifyConfig = {
  // Main custom blind product variant ID
  customBlindVariantId: '12345678901234',
  
  // Remote control product variant ID
  remoteProductVariantId: '12345678901235',
  
  // SmartHub product variant ID
  smartHubProductVariantId: '12345678901236',
  
  // Product page URL to navigate back to
  productPageUrl: '/products/custom-blackout-blind',
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
