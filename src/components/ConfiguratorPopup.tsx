
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import ProductConfigurator from './ProductConfigurator';

interface ConfiguratorPopupProps {
  isOpen: boolean;
  onClose: () => void;
  productData?: {
    title: string;
    price: number;
    image?: string;
  };
}

const ConfiguratorPopup = ({ isOpen, onClose, productData }: ConfiguratorPopupProps) => {
  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative w-full h-full bg-gray-50 overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="fixed top-4 right-4 z-[10000] bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Close configurator"
        >
          <X className="h-6 w-6 text-gray-600" />
        </button>

        {/* Product Info Bar (if provided) */}
        {productData && (
          <div className="bg-white border-b shadow-sm p-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center space-x-4">
                {productData.image && (
                  <img 
                    src={productData.image} 
                    alt={productData.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                )}
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">{productData.title}</h1>
                  <p className="text-sm text-gray-600">Customize your blind configuration</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Configurator Content */}
        <ProductConfigurator />
      </div>
    </div>
  );
};

export default ConfiguratorPopup;
