
(function() {
  'use strict';
  
  // Configuration
  const CONFIGURATOR_URL = window.location.origin; // Will be your deployed Lovable app URL
  
  // Create and inject styles
  function injectStyles() {
    if (document.getElementById('lovable-configurator-styles')) return;
    
    const styles = `
      .lovable-configurator-button {
        background: #2563eb;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 6px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.2s;
        margin: 10px 0;
      }
      
      .lovable-configurator-button:hover {
        background: #1d4ed8;
      }
      
      .lovable-configurator-button:disabled {
        background: #9ca3af;
        cursor: not-allowed;
      }
      
      .lovable-configurator-iframe {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: none;
        z-index: 9999;
        background: white;
      }
      
      .lovable-configurator-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 9998;
      }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.id = 'lovable-configurator-styles';
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
  }
  
  // Get product data from Shopify
  function getProductData() {
    // Try to get product data from various Shopify sources
    let productData = {};
    
    // Method 1: From meta tags
    const productTitle = document.querySelector('meta[property="og:title"]');
    const productImage = document.querySelector('meta[property="og:image"]');
    const productPrice = document.querySelector('.price, [data-price], .product-price');
    
    if (productTitle) productData.title = productTitle.getAttribute('content');
    if (productImage) productData.image = productImage.getAttribute('content');
    if (productPrice) productData.price = productPrice.textContent;
    
    // Method 2: From Shopify global objects
    if (window.ShopifyAnalytics && window.ShopifyAnalytics.meta && window.ShopifyAnalytics.meta.product) {
      const product = window.ShopifyAnalytics.meta.product;
      productData.title = product.title || productData.title;
      productData.price = product.price || productData.price;
    }
    
    // Method 3: From JSON-LD
    const jsonLd = document.querySelector('script[type="application/ld+json"]');
    if (jsonLd) {
      try {
        const data = JSON.parse(jsonLd.textContent);
        if (data['@type'] === 'Product') {
          productData.title = data.name || productData.title;
          productData.image = data.image || productData.image;
          if (data.offers && data.offers.price) {
            productData.price = data.offers.price;
          }
        }
      } catch (e) {
        // Ignore JSON parsing errors
      }
    }
    
    return productData;
  }
  
  // Create configurator iframe
  function createConfiguratorIframe(productData) {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'lovable-configurator-overlay';
    
    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.className = 'lovable-configurator-iframe';
    iframe.src = CONFIGURATOR_URL + '?popup=true&product=' + encodeURIComponent(JSON.stringify(productData));
    iframe.title = 'Blind Configurator';
    
    // Add close functionality
    overlay.addEventListener('click', closeConfigurator);
    
    // Listen for messages from iframe
    window.addEventListener('message', function(event) {
      if (event.origin !== CONFIGURATOR_URL) return;
      
      if (event.data.type === 'close-configurator') {
        closeConfigurator();
      } else if (event.data.type === 'add-to-cart') {
        closeConfigurator();
        // Handle cart addition - this will be processed by your Shopify app
        handleCartAddition(event.data.configuration, event.data.pricing);
      }
    });
    
    function closeConfigurator() {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
      document.body.style.overflow = '';
    }
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Add to DOM
    document.body.appendChild(overlay);
    document.body.appendChild(iframe);
  }
  
  // Handle cart addition
  function handleCartAddition(configuration, pricing) {
    // This will call your Shopify app API to process the custom configuration
    console.log('Configuration to add to cart:', configuration, pricing);
    
    // Show loading state
    const button = document.querySelector('.lovable-configurator-button');
    if (button) {
      button.textContent = 'Adding to cart...';
      button.disabled = true;
    }
    
    // Call your Shopify app API (you'll need to implement this endpoint)
    fetch('/apps/blind-configurator/cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        configuration: configuration,
        pricing: pricing,
        productId: getProductId()
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Redirect to cart or show success message
        window.location.href = '/cart';
      } else {
        alert('Error adding to cart: ' + data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error adding to cart. Please try again.');
    })
    .finally(() => {
      if (button) {
        button.textContent = 'Customize Your Blind';
        button.disabled = false;
      }
    });
  }
  
  // Get product ID from current page
  function getProductId() {
    // Try to get product ID from various sources
    if (window.ShopifyAnalytics && window.ShopifyAnalytics.meta && window.ShopifyAnalytics.meta.product) {
      return window.ShopifyAnalytics.meta.product.id;
    }
    
    // Try to get from URL
    const path = window.location.pathname;
    const productMatch = path.match(/\/products\/([^\/]+)/);
    if (productMatch) {
      return productMatch[1];
    }
    
    return null;
  }
  
  // Create and setup configure button
  function createConfigureButton() {
    const button = document.createElement('button');
    button.className = 'lovable-configurator-button';
    button.textContent = 'Customize Your Blind';
    
    button.addEventListener('click', function() {
      const productData = getProductData();
      createConfiguratorIframe(productData);
    });
    
    return button;
  }
  
  // Initialize when DOM is ready
  function init() {
    injectStyles();
    
    // Find where to insert the button
    const targetSelectors = [
      '.product-form__buttons',
      '.product-form',
      '.product__info',
      '.product-details',
      '#add-to-cart-form',
      '.product-single__add-to-cart'
    ];
    
    let target = null;
    for (const selector of targetSelectors) {
      target = document.querySelector(selector);
      if (target) break;
    }
    
    if (target) {
      const button = createConfigureButton();
      target.appendChild(button);
    } else {
      console.warn('Could not find suitable location for configurator button');
    }
  }
  
  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
