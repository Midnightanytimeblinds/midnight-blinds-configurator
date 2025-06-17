
# Shopify Integration Guide

## Quick Setup

### 1. Add the Embed Script to Your Theme

Add this code to your product page template (usually `sections/product-form.liquid` or `templates/product.liquid`):

```html
<!-- Add this before the closing </body> tag or in your product template -->
<script>
  // Update this URL to your deployed Lovable app URL
  window.CONFIGURATOR_URL = 'https://your-app.lovable.app';
</script>
<script src="https://your-app.lovable.app/shopify-embed.js"></script>
```

### 2. Customize Button Placement (Optional)

The script will automatically find a good location for the "Customize Your Blind" button. If you want to place it manually, add this where you want the button:

```html
<div id="blind-configurator-button-container"></div>
```

Then update the script to target your specific container:

```javascript
// In the embed script, change the targetSelectors array to:
const targetSelectors = ['#blind-configurator-button-container'];
```

### 3. Style the Button (Optional)

You can customize the button appearance by adding CSS to your theme:

```css
.lovable-configurator-button {
  background: #your-brand-color !important;
  font-family: your-theme-font !important;
  /* Add your custom styles */
}
```

## How It Works

1. **Customer clicks "Customize Your Blind"** on your product page
2. **Full-screen popup opens** with the blind configurator
3. **Customer configures their blind** (colors, size, options)
4. **Live pricing updates** as they make selections
5. **Customer clicks "Add to Cart"** when finished
6. **Configuration is sent to your Shopify app** for processing
7. **Customer is redirected to cart** with correctly priced product

## Next Steps

You'll need a simple Shopify app to handle the custom configurations and pricing. The app will:

- Receive configuration data from the popup
- Create properly priced cart items
- Handle the complex pricing logic
- Manage custom product variants

**Cost Estimate**: $2,000-$4,000 for the Shopify app development
**Timeline**: 2-3 weeks

## Support

For technical support or questions about the integration, please contact your development team.
