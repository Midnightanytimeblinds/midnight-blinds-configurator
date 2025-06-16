
import { shopifyConfig, initializeShopifyConfig } from '../config/shopify';

interface Configuration {
  frameColor: string;
  fabricType: string;
  fabricColor: string;
  mountType: string;
  width: number;
  height: number;
  measurementGuarantee: boolean;
  controlType: string;
  additionalRemote: boolean;
  smartHubQuantity: number;
  windowName: string;
}

interface PricingBreakdown {
  basePrice: number;
  measurementGuarantee: number;
  motorised: number;
  additionalRemote: number;
  smartHub: number;
  total: number;
}

export const addToShopifyCart = async (configuration: Configuration, pricing: PricingBreakdown) => {
  // Initialize configuration from window object if available
  initializeShopifyConfig();
  
  const cartItems = [];

  // Main product with all configuration as line item properties
  const lineItemProperties: Record<string, string> = {
    'Fabric Type': configuration.fabricType,
    'Fabric Colour': configuration.fabricColor,
    'Frame Colour': configuration.frameColor,
    'Mount Type': configuration.mountType,
    'Width': `${configuration.width}mm`,
    'Height': `${configuration.height}mm`,
    'Measurement Guarantee': configuration.measurementGuarantee ? 'Yes' : 'No',
    'Control Type': configuration.controlType,
    'Window Name': configuration.windowName,
    '_calculated_price': `$${pricing.total}`,
    '_base_price': `$${pricing.basePrice}`,
  };

  // Add main blind to cart
  cartItems.push({
    id: shopifyConfig.customBlindVariantId,
    quantity: 1,
    properties: lineItemProperties,
  });

  // Add remote if selected
  if (configuration.additionalRemote) {
    cartItems.push({
      id: shopifyConfig.remoteProductVariantId,
      quantity: 1,
    });
  }

  // Add SmartHub if selected
  if (configuration.smartHubQuantity > 0) {
    cartItems.push({
      id: shopifyConfig.smartHubProductVariantId,
      quantity: configuration.smartHubQuantity,
    });
  }

  console.log('Adding to cart:', cartItems);

  try {
    // Add each item to cart using Shopify's Cart API
    for (const item of cartItems) {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [item],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.description || 'Failed to add item to cart');
      }

      const result = await response.json();
      console.log('Item added to cart:', result);
    }

    return true;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};
