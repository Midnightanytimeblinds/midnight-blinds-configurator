
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

// Generate a hash for the configuration to create unique SKUs
const generateConfigHash = (config: Configuration): string => {
  const configString = JSON.stringify({
    fabricType: config.fabricType,
    fabricColor: config.fabricColor,
    frameColor: config.frameColor,
    mountType: config.mountType,
    width: config.width,
    height: config.height,
    measurementGuarantee: config.measurementGuarantee,
    controlType: config.controlType,
    windowName: config.windowName,
  });
  
  // Simple hash function - in production, use a proper hashing library
  let hash = 0;
  for (let i = 0; i < configString.length; i++) {
    const char = configString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36);
};

// Create dynamic variant via Shopify app
const createDynamicVariant = async (configuration: Configuration, pricing: PricingBreakdown): Promise<string> => {
  const configHash = generateConfigHash(configuration);
  
  // Variant metafields for configuration storage
  const metafields = [
    { key: 'fabric_type', value: configuration.fabricType, type: 'single_line_text_field' },
    { key: 'fabric_color', value: configuration.fabricColor, type: 'single_line_text_field' },
    { key: 'frame_color', value: configuration.frameColor, type: 'single_line_text_field' },
    { key: 'mount_type', value: configuration.mountType, type: 'single_line_text_field' },
    { key: 'width_mm', value: configuration.width.toString(), type: 'single_line_text_field' },
    { key: 'height_mm', value: configuration.height.toString(), type: 'single_line_text_field' },
    { key: 'measurement_guarantee', value: configuration.measurementGuarantee.toString(), type: 'boolean' },
    { key: 'control_type', value: configuration.controlType, type: 'single_line_text_field' },
    { key: 'window_name', value: configuration.windowName, type: 'single_line_text_field' },
    { key: 'calculated_price', value: pricing.total.toString(), type: 'number_decimal' },
    { key: 'config_hash', value: configHash, type: 'single_line_text_field' },
  ];

  try {
    // Call your Shopify app to create the variant
    const response = await fetch(`${shopifyConfig.appBaseUrl}/api/variants/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${shopifyConfig.appApiKey}`,
      },
      body: JSON.stringify({
        productId: shopifyConfig.customBlindProductId,
        price: pricing.total,
        sku: `CUSTOM-BLIND-${configHash}`,
        title: `${configuration.width}mm x ${configuration.height}mm - ${configuration.fabricColor}`,
        metafields: metafields,
        inventoryTracked: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create variant: ${response.statusText}`);
    }

    const result = await response.json();
    return result.variantId;
  } catch (error) {
    console.error('Error creating dynamic variant:', error);
    throw new Error('Failed to create custom variant. Please try again.');
  }
};

export const addToShopifyCart = async (configuration: Configuration, pricing: PricingBreakdown) => {
  // Initialize configuration from window object if available
  initializeShopifyConfig();
  
  try {
    // Create dynamic variant with correct pricing
    const customVariantId = await createDynamicVariant(configuration, pricing);
    
    const cartItems = [];

    // Add custom blind variant with correct pricing
    cartItems.push({
      id: customVariantId,
      quantity: 1,
      // No line item properties needed - pricing is in the variant
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

    console.log('Adding to cart with dynamic variant:', cartItems);

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
