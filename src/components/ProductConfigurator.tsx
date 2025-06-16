import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft } from 'lucide-react';
import ColorStep from './configurator/ColorStep';
import MountStep from './configurator/MountStep';
import MeasurementStep from './configurator/MeasurementStep';
import ControlStep from './configurator/ControlStep';
import RemoteStep from './configurator/RemoteStep';
import AccessoriesStep from './configurator/AccessoriesStep';
import WindowNameStep from './configurator/WindowNameStep';
import { calculatePrice } from '../utils/pricingCalculator';
import { addToShopifyCart } from '../utils/shopifyCart';
import { shopifyConfig } from '../config/shopify';

interface Configuration {
  frameColor: string;
  fabricType: string;
  fabricColor: string;
  mountType: string;
  width: number; // in mm
  height: number; // in mm
  measurementGuarantee: boolean;
  controlType: string;
  additionalRemote: boolean;
  smartHubQuantity: number;
  windowName: string;
}

const STEPS = [
  { id: 1, title: 'Pick your colour', component: ColorStep },
  { id: 2, title: 'Mount style', component: MountStep },
  { id: 3, title: 'Measurements', component: MeasurementStep },
  { id: 4, title: 'Remote option', component: RemoteStep },
  { id: 5, title: 'Optional accessories', component: AccessoriesStep },
  { id: 6, title: 'Name your window', component: WindowNameStep },
];

const ProductConfigurator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [configuration, setConfiguration] = useState<Configuration>({
    frameColor: '',
    fabricType: '',
    fabricColor: '',
    mountType: '',
    width: 0,
    height: 0,
    measurementGuarantee: false,
    controlType: 'motorised', // Set motorised as default
    additionalRemote: false,
    smartHubQuantity: 0,
    windowName: '',
  });
  const [pricing, setPricing] = useState(calculatePrice(configuration));
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    setPricing(calculatePrice(configuration));
  }, [configuration]);

  const handleBackToProduct = () => {
    // Navigate back to Shopify product page using configured URL
    window.location.href = shopifyConfig.productPageUrl;
  };

  const updateConfiguration = (updates: Partial<Configuration>) => {
    console.log('Configuration update:', updates);
    setConfiguration(prev => ({ ...prev, ...updates }));
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1: return !!(configuration.frameColor && configuration.fabricType && configuration.fabricColor);
      case 2: return !!configuration.mountType;
      case 3: return configuration.width >= 530 && configuration.width <= 3000 && 
                     configuration.height >= 300 && configuration.height <= 3900;
      case 4: return typeof configuration.additionalRemote === 'boolean';
      case 5: return true; // Optional step
      case 6: return !!configuration.windowName;
      default: return false;
    }
  };

  const canProceed = isStepValid(currentStep);
  const isMotorised = configuration.controlType === 'motorised';
  const visibleSteps = STEPS; // Show all steps since we removed the conditional logic

  const currentStepIndex = visibleSteps.findIndex(step => step.id === currentStep);
  const progress = ((currentStepIndex + 1) / visibleSteps.length) * 100;

  const handleNext = () => {
    if (canProceed) {
      const nextStepIndex = currentStepIndex + 1;
      if (nextStepIndex < visibleSteps.length) {
        setCurrentStep(visibleSteps[nextStepIndex].id);
      }
    }
  };

  const handlePrevious = () => {
    const prevStepIndex = currentStepIndex - 1;
    if (prevStepIndex >= 0) {
      setCurrentStep(visibleSteps[prevStepIndex].id);
    }
  };

  const handleAddToCart = async () => {
    if (!canProceed) return;
    
    setIsAddingToCart(true);
    
    try {
      await addToShopifyCart(configuration, pricing);
      
      // Redirect to cart page after successful addition
      window.location.href = '/cart';
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('There was an error adding your blind to the cart. Please try again.');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const CurrentStepComponent = visibleSteps.find(step => step.id === currentStep)?.component;
  const isLastStep = currentStepIndex === visibleSteps.length - 1;

  // Get fabric color details for display
  const getFabricColorDetails = () => {
    if (!configuration.fabricType || !configuration.fabricColor) return null;
    
    const FABRIC_COLORS = {
      'duo-blockout': [
        { id: 'duo-aztec', name: 'Aztec', image: '/lovable-uploads/76e5cbb7-cc79-412b-b223-cd65e466e8f6.png' },
        { id: 'duo-graphite', name: 'Graphite', image: '/lovable-uploads/7a78abd3-b3aa-456f-b396-8bdeadfb611a.png' },
        { id: 'duo-linen', name: 'Linen', image: '/lovable-uploads/739df3c8-b03c-47c5-b248-edb703766ee4.png' },
        { id: 'duo-charcoal', name: 'Charcoal', image: '/lovable-uploads/2d6c4dc5-5765-494c-832d-e5eda96ea806.png' },
        { id: 'duo-stone', name: 'Stone', image: '/lovable-uploads/246960fd-7b4d-42df-86d9-04d77e6de010.png' },
        { id: 'duo-silver', name: 'Silver', image: '/lovable-uploads/1b884d9e-541f-4e60-8f2b-142052a243d1.png' },
        { id: 'duo-pearl', name: 'Pearl', image: '/lovable-uploads/020b87c0-cbee-43dc-a1a0-789f14918729.png' },
        { id: 'duo-sandstone', name: 'Sandstone', image: '/lovable-uploads/9c7cfdc4-7d8b-4e55-aa94-0092793c1060.png' },
        { id: 'duo-canvas', name: 'Canvas', image: '/lovable-uploads/e5517323-ef2f-41a4-8b48-70032f2dbe08.png' },
        { id: 'duo-champagne', name: 'Champagne', image: '/lovable-uploads/92df69be-6dd3-411a-90fb-a04bff82c61a.png' },
      ],
      'lereve-blockout': [
        { id: 'lereve-black', name: 'Deep Black', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop' },
        { id: 'lereve-charcoal', name: 'Charcoal', image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop' },
        { id: 'lereve-dark-grey', name: 'Dark Grey', image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop' },
        { id: 'lereve-medium-grey', name: 'Medium Grey', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop' },
        { id: 'lereve-light-grey', name: 'Light Grey', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop' },
      ],
    };

    const fabricColors = FABRIC_COLORS[configuration.fabricType as keyof typeof FABRIC_COLORS];
    return fabricColors?.find(color => color.id === configuration.fabricColor);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Configurator */}
        <div className="lg:col-span-2 space-y-6">
          {/* Back Button */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={handleBackToProduct}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 p-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Product</span>
            </Button>
          </div>

          {/* Progress Header */}
          <div className="bg-white rounded-lg border shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Configure Your Blind
              </h2>
              <Badge variant="secondary" className="text-sm bg-blue-100 text-blue-800">
                Step {currentStepIndex + 1} of {visibleSteps.length}
              </Badge>
            </div>
            <Progress value={progress} className="w-full h-2 bg-gray-200" />
          </div>

          {/* Current Step */}
          <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b">
              <div className="flex items-center space-x-3">
                <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  {currentStepIndex + 1}
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {visibleSteps[currentStepIndex]?.title}
                </h3>
              </div>
            </div>
            <div className="p-6">
              {CurrentStepComponent && (
                <CurrentStepComponent
                  configuration={configuration}
                  updateConfiguration={updateConfiguration}
                />
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStepIndex === 0}
              className="px-8 py-3 text-base border-gray-300"
            >
              ← Back
            </Button>
            {isLastStep ? (
              <Button
                onClick={handleAddToCart}
                disabled={!canProceed || isAddingToCart}
                className="px-8 py-3 text-base bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isAddingToCart ? 'Adding to Cart...' : `Add to Cart - $${pricing.total}`}
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!canProceed}
                className="px-8 py-3 text-base bg-blue-600 hover:bg-blue-700 text-white"
              >
                Continue →
              </Button>
            )}
          </div>
        </div>

        {/* Live Pricing Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border shadow-sm lg:sticky lg:top-6">
            <div className="p-6 border-b">
              <h3 className="text-lg font-bold text-gray-900">Order Summary</h3>
            </div>
            <div className="p-6 space-y-6">
              {/* Visual Preview */}
              {(configuration.frameColor || configuration.fabricColor) && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-sm mb-3 text-gray-700">Your Selection</h4>
                  <div className="flex items-center space-x-4">
                    {configuration.frameColor && (
                      <div className="text-center">
                        <div className="w-10 h-10 rounded border-2 mx-auto mb-2 shadow-sm" style={{
                          backgroundColor: configuration.frameColor === 'white' ? '#FFFFFF' : 
                                         configuration.frameColor === 'black' ? '#000000' :
                                         configuration.frameColor === 'silver' ? '#C0C0C0' : '#CD7F32',
                          borderColor: configuration.frameColor === 'white' ? '#E5E7EB' : 'transparent'
                        }} />
                        <span className="text-xs text-gray-600 font-medium">Frame</span>
                      </div>
                    )}
                    {configuration.fabricType && configuration.fabricColor && (() => {
                      const fabricDetails = getFabricColorDetails();
                      return (
                        <div className="text-center flex-1">
                          <div className="w-16 h-10 rounded border mx-auto mb-2 shadow-sm overflow-hidden">
                            {fabricDetails ? (
                              <img 
                                src={fabricDetails.image} 
                                alt={fabricDetails.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div style={{
                                backgroundColor: configuration.fabricColor.includes('white') ? '#FFFFFF' :
                                             configuration.fabricColor.includes('black') ? '#000000' :
                                             configuration.fabricColor.includes('grey') ? '#808080' :
                                             configuration.fabricColor.includes('cream') ? '#F5F5DC' :
                                             configuration.fabricColor.includes('blue') ? '#2C3E50' : '#D1D5DB',
                                borderColor: configuration.fabricColor.includes('white') ? '#E5E7EB' : 'transparent'
                              }} className="w-full h-full" />
                            )}
                          </div>
                          <span className="text-xs text-gray-600 font-medium">
                            {getFabricColorDetails()?.name || configuration.fabricType}
                          </span>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Motorised blind ({configuration.width}mm × {configuration.height}mm)</span>
                  <span className="font-medium">${pricing.basePrice}</span>
                </div>
                {configuration.measurementGuarantee && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Measurement Guarantee</span>
                    <span className="font-medium">$40</span>
                  </div>
                )}
                {configuration.additionalRemote && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Additional Remote</span>
                    <span className="font-medium">$129</span>
                  </div>
                )}
                {configuration.smartHubQuantity > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">SmartHub × {configuration.smartHubQuantity}</span>
                    <span className="font-medium">${129 * configuration.smartHubQuantity}</span>
                  </div>
                )}
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-blue-600">${pricing.total}</span>
              </div>
              
              {configuration.windowName && (
                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <span className="font-medium">Window:</span> {configuration.windowName}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductConfigurator;
