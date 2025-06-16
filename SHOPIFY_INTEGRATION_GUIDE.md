
# Shopify Integration Guide

This guide will help you integrate the Custom Blind Configurator into your Shopify store with support for additional sections below the configurator.

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

2. **Create Section File:**
   - In `sections` folder, create `blind-configurator.liquid`
   - Copy the content from the section example below

3. **Create Product Template:**
   - In `templates` folder, create `product.configurator.liquid`
   - Copy the content from the template example below

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

## Step 4: Section Template (`blind-configurator.liquid`)

```liquid
<!-- Blind Configurator Section -->
<div class="blind-configurator-section" 
     style="background-color: {{ section.settings.background_color }}; 
            padding: {{ section.settings.padding_top }}px 0 {{ section.settings.padding_bottom }}px 0;">
  
  <!-- Configurator Container -->
  <div id="configurator-root"></div>

  <!-- Load the configurator assets -->
  {{ 'index-abc123.css' | asset_url | stylesheet_tag }}

  <script>
    // Configure Shopify integration
    window.shopifyConfig = {
      customBlindVariantId: '{{ product.variants.first.id }}',
      remoteProductVariantId: '{{ section.settings.remote_variant_id }}',
      smartHubProductVariantId: '{{ section.settings.smarthub_variant_id }}',
      productPageUrl: '{{ product.url }}'
    };
  </script>

  {{ 'index-abc123.js' | asset_url | script_tag }}
</div>

{% schema %}
{
  "name": "Blind Configurator",
  "settings": [
    {
      "type": "text",
      "id": "remote_variant_id",
      "label": "Remote Control Variant ID",
      "default": "12345678901235"
    },
    {
      "type": "text",
      "id": "smarthub_variant_id",
      "label": "SmartHub Variant ID",
      "default": "12345678901236"
    },
    {
      "type": "color",
      "id": "background_color",
      "label": "Background Color",
      "default": "#f9fafb"
    },
    {
      "type": "range",
      "id": "padding_top",
      "label": "Top Padding",
      "min": 0,
      "max": 100,
      "step": 5,
      "default": 0
    },
    {
      "type": "range",
      "id": "padding_bottom",
      "label": "Bottom Padding",
      "min": 0,
      "max": 100,
      "step": 5,
      "default": 20
    }
  ],
  "presets": [
    {
      "name": "Blind Configurator"
    }
  ]
}
{% endschema %}
```

## Step 5: Product Template (`product.configurator.liquid`)

```liquid
<!-- Product Configurator Template -->
<div class="product-configurator-page">
  
  <!-- Include the configurator section -->
  {% section 'blind-configurator' %}
  
  <!-- Additional sections can be added here -->
  {% if product.metafields.custom.show_features %}
    {% section 'product-features' %}
  {% endif %}
  
  {% if product.metafields.custom.show_testimonials %}
    {% section 'testimonials' %}
  {% endif %}
  
  {% if product.metafields.custom.show_faq %}
    {% section 'faq' %}
  {% endif %}
  
  <!-- Or use dynamic sections (Shopify 2.0) -->
  {% for section in product.sections %}
    {% render section %}
  {% endfor %}
  
</div>
```

## Step 6: Create Additional Sections (Optional)

You can create additional sections to display below the configurator:

### Product Features Section (`product-features.liquid`)
```liquid
<div class="product-features-section py-16 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-gray-900 mb-4">{{ section.settings.heading }}</h2>
      <p class="text-lg text-gray-600">{{ section.settings.description }}</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      {% for block in section.blocks %}
        <div class="text-center">
          <div class="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
            <svg class="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <!-- Add your icon SVG here -->
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ block.settings.title }}</h3>
          <p class="text-gray-600">{{ block.settings.description }}</p>
        </div>
      {% endfor %}
    </div>
  </div>
</div>

{% schema %}
{
  "name": "Product Features",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Why Choose Our Blinds?"
    },
    {
      "type": "textarea",
      "id": "description",
      "label": "Description"
    }
  ],
  "blocks": [
    {
      "type": "feature",
      "name": "Feature",
      "settings": [
        {
          "type": "text",
          "id": "title",
          "label": "Title"
        },
        {
          "type": "textarea",
          "id": "description",
          "label": "Description"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Product Features"
    }
  ]
}
{% endschema %}
```

## Step 7: Configure Integration

1. **Update Asset Filenames:**
   - Replace `index-abc123.js` and `index-abc123.css` with your actual build filenames

2. **Set Variant IDs:**
   - In the theme customizer, go to your configurator section
   - Enter the actual Remote Control and SmartHub variant IDs

3. **Customize Appearance:**
   - Adjust background colors, padding, and other styling options
   - Add your brand colors and fonts

## Step 8: Add Content Below Configurator

1. **Through Theme Customizer:**
   - Navigate to your product page with the configurator template
   - Use "Customize" to add sections below the configurator
   - Choose from existing sections or create custom ones

2. **Through Metafields:**
   - Set up product metafields to control which sections appear
   - Use conditional logic in your template to show/hide sections

3. **Static Sections:**
   - Add sections directly in the product template
   - Include features, testimonials, FAQs, or other content

## Step 9: Test Integration

1. Navigate to your custom blind product page with `?view=configurator`
2. Complete the configuration process
3. Scroll down to verify additional sections appear below
4. Test responsive behavior on mobile devices
5. Verify items are added to cart correctly

## Benefits of This Approach

- **SEO Friendly:** Additional content below the configurator
- **Conversion Focused:** Landing page structure with social proof
- **Customizable:** Easy to manage through Shopify theme customizer
- **Responsive:** Works on all devices
- **Brand Consistent:** Integrates with your existing theme

## Next Steps

After successful integration:
1. Create compelling content for sections below the configurator
2. Add customer testimonials and reviews
3. Include detailed product specifications
4. Set up FAQ section for common questions
5. Add trust badges and guarantees
6. Test the full customer journey
7. Monitor conversion rates and optimize

## Troubleshooting

### Configurator Not Loading
- Check that asset files are uploaded correctly
- Verify script tags are loading without errors
- Check browser console for JavaScript errors

### Sections Not Appearing
- Ensure sections are properly included in the template
- Check that section files exist in the `sections` folder
- Verify conditional logic for section display

### Styling Issues
- Check for CSS conflicts between configurator and theme
- Adjust padding and margins in section settings
- Test responsive behavior across devices

### Cart API Errors
- Ensure variant IDs are correct
- Check that products are published
- Verify inventory is available for tracked products
