
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
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-gray-900">
                Custom Blind Configurator
              </CardTitle>
              <Badge variant="secondary" className="text-sm">
                Step {currentStepIndex + 1} of {visibleSteps.length}
              </Badge>
            </div>
            <Progress value={progress} className="w-full h-2" />
          </CardHeader>
        </Card>

        {/* Current Step */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">
              {visibleSteps[currentStepIndex]?.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {CurrentStepComponent && (
              <CurrentStepComponent
                configuration={configuration}
                updateConfiguration={updateConfiguration}
              />
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStepIndex === 0}
            className="px-6"
          >
            Previous
          </Button>
          {isLastStep ? (
            <Button
              onClick={handleAddToCart}
              disabled={!canProceed}
              className="px-8 bg-blue-600 hover:bg-blue-700"
            >
              Add to Cart - ${pricing.total}
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!canProceed}
              className="px-6 bg-blue-600 hover:bg-blue-700"
            >
              Next Step
            </Button>
          )}
        </div>
      </div>

      {/* Live Pricing Sidebar */}
      <div className="lg:col-span-1">
        <Card className="sticky top-6">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Visual Preview */}
            {(configuration.frameColor || configuration.fabricColor) && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-sm mb-3">Your Selection</h3>
                <div className="flex items-center space-x-3">
                  {configuration.frameColor && (
                    <div className="text-center">
                      <div className="w-8 h-8 rounded border-2 mx-auto mb-1" style={{
                        backgroundColor: configuration.frameColor === 'white' ? '#FFFFFF' : 
                                       configuration.frameColor === 'black' ? '#000000' :
                                       configuration.frameColor === 'silver' ? '#C0C0C0' : '#CD7F32',
                        borderColor: configuration.frameColor === 'white' ? '#E5E7EB' : 'transparent'
                      }} />
                      <span className="text-xs text-gray-600">Frame</span>
                    </div>
                  )}
                  {configuration.fabricType && configuration.fabricColor && (
                    <div className="text-center flex-1">
                      <div className="w-12 h-8 rounded border mx-auto mb-1" style={{
                        backgroundColor: configuration.fabricColor.includes('white') ? '#FFFFFF' :
                                       configuration.fabricColor.includes('black') ? '#000000' :
                                       configuration.fabricColor.includes('grey') ? '#808080' :
                                       configuration.fabricColor.includes('cream') ? '#F5F5DC' :
                                       configuration.fabricColor.includes('blue') ? '#2C3E50' : '#D1D5DB',
                        borderColor: configuration.fabricColor.includes('white') ? '#E5E7EB' : 'transparent'
                      }} />
                      <span className="text-xs text-gray-600">{configuration.fabricType}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Base blind ({configuration.width.cm + configuration.width.mm/10}cm × {configuration.height.cm + configuration.height.mm/10}cm)</span>
                <span>${pricing.basePrice}</span>
              </div>
              {configuration.measurementGuarantee && (
                <div className="flex justify-between text-sm">
                  <span>Measurement Guarantee</span>
                  <span>$40</span>
                </div>
              )}
              {configuration.controlType === 'motorised' && (
                <div className="flex justify-between text-sm">
                  <span>Motorised</span>
                  <span>$299</span>
                </div>
              )}
              {configuration.additionalRemote && (
                <div className="flex justify-between text-sm">
                  <span>Additional Remote</span>
                  <span>$129</span>
                </div>
              )}
              {configuration.smartHubQuantity > 0 && (
                <div className="flex justify-between text-sm">
                  <span>SmartHub × {configuration.smartHubQuantity}</span>
                  <span>${129 * configuration.smartHubQuantity}</span>
                </div>
              )}
            </div>
            <Separator />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${pricing.total}</span>
            </div>
            {configuration.windowName && (
              <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                Window: {configuration.windowName}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductConfigurator;
