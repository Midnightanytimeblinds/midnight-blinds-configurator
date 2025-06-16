
# Dynamic Variant Implementation Guide

This document outlines the complete implementation needed to support dynamic variant creation for accurate pricing.

## 1. Shopify App Requirements

### Required Scopes
- `write_products` - Create product variants
- `read_products` - Read product information
- `write_orders` - Process order webhooks
- `read_orders` - Read order data

### Core App Structure
```
shopify-app/
├── app.js (Express server)
├── routes/
│   ├── variants.js (variant creation)
│   └── webhooks.js (order processing)
├── models/
│   └── VariantMapping.js (database model)
└── utils/
    └── shopify.js (API client)
```

## 2. Key API Endpoints

### POST /api/variants/create
Creates a new product variant with custom pricing and configuration.

**Request Body:**
```json
{
  "productId": "1234567890123",
  "price": 685.00,
  "sku": "CUSTOM-BLIND-abc123def456",
  "title": "1200mm x 1500mm - Graphite",
  "metafields": [...],
  "inventoryTracked": false
}
```

**Response:**
```json
{
  "variantId": "12345678901237",
  "success": true
}
```

### GET /api/variants/cleanup
Removes unused variants older than specified days.

### POST /webhooks/orders/create
Processes new orders with custom variants for fulfillment.

## 3. Database Schema

### VariantMapping Table
```sql
CREATE TABLE variant_mappings (
  id SERIAL PRIMARY KEY,
  variant_id VARCHAR(255) UNIQUE,
  config_hash VARCHAR(255),
  configuration JSONB,
  price DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT NOW(),
  last_used TIMESTAMP DEFAULT NOW()
);
```

## 4. Configuration Updates Needed

### Frontend Configuration (shopify.ts)
- Add `customBlindProductId` (product ID, not variant)
- Add `appBaseUrl` for your Shopify app
- Add `appApiKey` for authentication

### Shopify Theme Updates
Update the configurator section to include app configuration:

```liquid
<script>
  window.shopifyConfig = {
    customBlindProductId: '{{ product.id }}',
    customBlindVariantId: '{{ product.variants.first.id }}',
    remoteProductVariantId: '{{ section.settings.remote_variant_id }}',
    smartHubProductVariantId: '{{ section.settings.smarthub_variant_id }}',
    productPageUrl: '{{ product.url }}',
    appBaseUrl: '{{ section.settings.app_base_url }}',
    appApiKey: '{{ section.settings.app_api_key }}'
  };
</script>
```

## 5. Implementation Phases

### Phase 1: Basic App Setup (1-2 weeks)
- Create Shopify app with required scopes
- Implement variant creation endpoint
- Set up basic database structure
- Test variant creation manually

### Phase 2: Integration (1 week)
- Update frontend code to use dynamic variants
- Implement error handling and retries
- Test full customer journey

### Phase 3: Production Features (1 week)
- Implement variant cleanup
- Add order processing webhooks
- Performance optimization
- Monitoring and logging

### Phase 4: Deployment & Testing (1 week)
- Deploy app to production
- Update Shopify theme configuration
- End-to-end testing
- Go-live preparation

## 6. Development Considerations

### Error Handling
- API rate limiting
- Fallback to base variant if app fails
- Retry logic for network errors
- User-friendly error messages

### Performance
- Variant deduplication (same config = same variant)
- Efficient cleanup scheduling
- Database indexing on config_hash
- Caching for frequently used variants

### Security
- Validate all configuration inputs
- Secure API key management
- HMAC verification for webhooks
- Rate limiting on variant creation

## 7. Cost Estimates

### Development Time
- **Basic Implementation**: 20-30 hours
- **Production Ready**: 40-50 hours
- **Testing & Deployment**: 10-15 hours
- **Total**: 70-95 hours

### Ongoing Costs
- App hosting: $20-50/month
- Database: $10-25/month
- Monitoring: $10-20/month

## 8. Alternative Solutions Considered

### Draft Orders API
- **Pros**: More control over pricing
- **Cons**: Complex checkout flow, requires custom UI

### Price Rules & Discounts
- **Pros**: Uses native Shopify features
- **Cons**: Limited flexibility, complex rule management

### Shopify Scripts (Plus only)
- **Pros**: Native checkout integration
- **Cons**: Requires Shopify Plus, Ruby knowledge

**Recommendation**: Dynamic variant creation provides the best balance of functionality, cost, and development complexity.
