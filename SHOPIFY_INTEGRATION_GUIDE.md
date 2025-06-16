
# Shopify Integration Guide

This guide will help you integrate the Custom Blind Configurator into your Shopify store.

## Step 1: Build the Application

```bash
npm run build
```

This creates a `dist` folder with all the production files.

## Step 2: Upload Files to Shopify

1. **Upload Assets:**
   - Go to Shopify Admin → Online Store → Themes → Actions → Edit Code
   - Upload all files from `dist/assets/` to the `assets` folder
   - Note the filenames (e.g., `index-abc123.js`, `index-xyz789.css`)

2. **Create a new template:**
   - In `templates` folder, create `product.configurator.liquid`
   - Copy the content from the example below

## Step 3: Create Products in Shopify

Create these products in your Shopify admin:

1. **Custom Blackout Blind**
   - Title: "Custom Blackout Blind"
   - Price: $560 (minimum base price)
   - SKU: CUSTOM-BLIND-001
   - Note the Variant ID

2. **Remote Control** (Hidden from catalog)
   - Title: "Additional Remote Control"
   - Price: $129
   - SKU: REMOTE-001
   - Hide from collections/search
   - Note the Variant ID

3. **SmartHub** (Hidden from catalog)
   - Title: "SmartHub"
   - Price: $129
   - SKU: SMARTHUB-001
   - Track inventory if needed
   - Hide from collections/search
   - Note the Variant ID

## Step 4: Configure the Integration

Replace the variant IDs in your template with the actual ones from step 3.

### Example Product Template (`product.configurator.liquid`)

```liquid
<!-- Custom Blind Configurator -->
<div id="configurator-root"></div>

<!-- Load the configurator assets -->
{{ 'index-abc123.css' | asset_url | stylesheet_tag }}

<script>
  // Configure Shopify integration
  window.shopifyConfig = {
    customBlindVariantId: '{{ product.variants.first.id }}',
    remoteProductVariantId: '12345678901235', // Replace with actual Remote variant ID
    smartHubProductVariantId: '12345678901236', // Replace with actual SmartHub variant ID
    productPageUrl: '{{ product.url }}'
  };
</script>

{{ 'index-abc123.js' | asset_url | script_tag }}
```

## Step 5: Test the Integration

1. Navigate to your custom blind product page with `?view=configurator`
2. Complete the configuration process
3. Verify items are added to cart correctly
4. Check that line item properties appear in test orders

## Step 6: Production Configuration

Update these values in your template:

```javascript
window.shopifyConfig = {
  customBlindVariantId: 'YOUR_CUSTOM_BLIND_VARIANT_ID',
  remoteProductVariantId: 'YOUR_REMOTE_VARIANT_ID', 
  smartHubProductVariantId: 'YOUR_SMARTHUB_VARIANT_ID',
  productPageUrl: '/products/custom-blackout-blind'
};
```

## Troubleshooting

### Cart API Errors
- Ensure variant IDs are correct
- Check that products are published
- Verify inventory is available for tracked products

### Configuration Not Loading
- Check that asset files are uploaded correctly
- Verify script tags are loading without errors
- Check browser console for JavaScript errors

### Back Button Not Working
- Ensure `productPageUrl` is set correctly
- Test navigation flow

## Development vs Production

In development, the app runs on `localhost:5173`. In production, it's served from Shopify's CDN as static files.

## Next Steps

After successful integration:
1. Test the full customer journey
2. Configure Google Analytics if needed
3. Set up order fulfillment processes
4. Train customer service team on the new system
