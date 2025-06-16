
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import ColorStep from './configurator/ColorStep';
import MountStep from './configurator/MountStep';
import MeasurementStep from './configurator/MeasurementStep';
import ControlStep from './configurator/ControlStep';
import RemoteStep from './configurator/RemoteStep';
import AccessoriesStep from './configurator/AccessoriesStep';
import WindowNameStep from './configurator/WindowNameStep';
import { calculatePrice } from '../utils/pricingCalculator';

interface Configuration {
  frameColor: string;
  fabricType: string;
  fabricColor: string;
  mountType: string;
  width: { cm: number; mm: number };
  height: { cm: number; mm: number };
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
  { id: 4, title: 'Control type', component: ControlStep },
  { id: 5, title: 'Remote option', component: RemoteStep },
  { id: 6, title: 'Optional accessories', component: AccessoriesStep },
  { id: 7, title: 'Name your window', component: WindowNameStep },
];

const ProductConfigurator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [configuration, setConfiguration] = useState<Configuration>({
    frameColor: '',
    fabricType: '',
    fabricColor: '',
    mountType: '',
    width: { cm: 0, mm: 0 },
    height: { cm: 0, mm: 0 },
    measurementGuarantee: false,
    controlType: '',
    additionalRemote: false,
    smartHubQuantity: 0,
    windowName: '',
  });
  const [pricing, setPricing] = useState(calculatePrice(configuration));

  useEffect(() => {
    setPricing(calculatePrice(configuration));
  }, [configuration]);

  const updateConfiguration = (updates: Partial<Configuration>) => {
    setConfiguration(prev => ({ ...prev, ...updates }));
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1: return !!(configuration.frameColor && configuration.fabricType && configuration.fabricColor);
      case 2: return !!configuration.mountType;
      case 3: return configuration.width.cm > 0 && configuration.height.cm > 0;
      case 4: return !!configuration.controlType;
      case 5: return configuration.controlType !== 'motorised' || typeof configuration.additionalRemote === 'boolean';
      case 6: return true; // Optional step
      case 7: return !!configuration.windowName;
      default: return false;
    }
  };

  const canProceed = isStepValid(currentStep);
  const isMotorised = configuration.controlType === 'motorised';
  const visibleSteps = STEPS.filter(step => 
    step.id !== 5 || isMotorised
  );

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

  const handleAddToCart = () => {
    // Prepare line item properties for Shopify
    const lineItemProperties = {
      'Fabric Type': configuration.fabricType,
      'Fabric Colour': configuration.fabricColor,
      'Frame Colour': configuration.frameColor,
      'Mount Type': configuration.mountType,
      'Width': `${configuration.width.cm}cm ${configuration.width.mm}mm`,
      'Height': `${configuration.height.cm}cm ${configuration.height.mm}mm`,
      'Measurement Guarantee': configuration.measurementGuarantee ? 'Yes' : 'No',
      'Control Type': configuration.controlType,
      'Remote': configuration.additionalRemote ? 'Yes' : 'No',
      'SmartHub': configuration.smartHubQuantity.toString(),
      'Window Name': configuration.windowName,
      '_calculated_price': `$${pricing.total}`,
    };

    console.log('Adding to cart:', lineItemProperties);
    // Here you would integrate with Shopify's cart API
  };

  const CurrentStepComponent = visibleSteps.find(step => step.id === currentStep)?.component;
  const isLastStep = currentStepIndex === visibleSteps.length - 1;

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Configurator */}
      <div className="lg:col-span-2 space-y-6">
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
              disabled={!canProceed}
              className="px-8 py-3 text-base bg-blue-600 hover:bg-blue-700 text-white"
            >
              Add to Cart - ${pricing.total}
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
        <div className="bg-white rounded-lg border shadow-sm sticky top-6">
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
                  {configuration.fabricType && configuration.fabricColor && (
                    <div className="text-center flex-1">
                      <div className="w-16 h-10 rounded border mx-auto mb-2 shadow-sm" style={{
                        backgroundColor: configuration.fabricColor.includes('white') ? '#FFFFFF' :
                                       configuration.fabricColor.includes('black') ? '#000000' :
                                       configuration.fabricColor.includes('grey') ? '#808080' :
                                       configuration.fabricColor.includes('cream') ? '#F5F5DC' :
                                       configuration.fabricColor.includes('blue') ? '#2C3E50' : '#D1D5DB',
                        borderColor: configuration.fabricColor.includes('white') ? '#E5E7EB' : 'transparent'
                      }} />
                      <span className="text-xs text-gray-600 font-medium">{configuration.fabricType}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Price Breakdown */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Base blind ({Math.round((configuration.width?.cm || 0) * 10 + (configuration.width?.mm || 0))}mm × {Math.round((configuration.height?.cm || 0) * 10 + (configuration.height?.mm || 0))}mm)</span>
                <span className="font-medium">${pricing.basePrice}</span>
              </div>
              {configuration.measurementGuarantee && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Measurement Guarantee</span>
                  <span className="font-medium">$40</span>
                </div>
              )}
              {configuration.controlType === 'motorised' && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Motorised</span>
                  <span className="font-medium">$299</span>
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
  );
};

export default ProductConfigurator;
