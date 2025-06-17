
import React, { useState, useEffect } from 'react';
import ProductConfigurator from '@/components/ProductConfigurator';
import ConfiguratorPopup from '@/components/ConfiguratorPopup';

const Index = () => {
  const [isPopupMode, setIsPopupMode] = useState(false);
  const [productData, setProductData] = useState<any>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const popup = urlParams.get('popup');
    const product = urlParams.get('product');
    
    if (popup === 'true') {
      setIsPopupMode(true);
      if (product) {
        try {
          setProductData(JSON.parse(decodeURIComponent(product)));
        } catch (e) {
          console.error('Error parsing product data:', e);
        }
      }
    }
  }, []);

  if (isPopupMode) {
    return (
      <ConfiguratorPopup
        isOpen={true}
        onClose={() => {
          window.parent.postMessage({ type: 'close-configurator' }, '*');
        }}
        productData={productData}
      />
    );
  }

  return (
    <div className="bg-gray-50">
      <main className="py-8">
        <ProductConfigurator />
      </main>
    </div>
  );
};

export default Index;
