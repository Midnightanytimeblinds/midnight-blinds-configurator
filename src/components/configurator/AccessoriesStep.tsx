
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface AccessoriesStepProps {
  configuration: any;
  updateConfiguration: (updates: any) => void;
}

const AccessoriesStep = ({ configuration, updateConfiguration }: AccessoriesStepProps) => {
  const handleSmartHubQuantityChange = (change: number) => {
    const newQuantity = Math.max(0, configuration.smartHubQuantity + change);
    updateConfiguration({ smartHubQuantity: newQuantity });
  };

  const isMotorised = configuration.controlType === 'motorised';

  if (!isMotorised) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">📱</div>
        <h3 className="text-lg font-semibold mb-2">Smart Accessories</h3>
        <p className="text-gray-600">
          Smart accessories are available with motorised blinds.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-semibold mb-4 block">Optional Smart Accessories</Label>
        
        {/* SmartHub */}
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">🏠</div>
                <div>
                  <CardTitle className="text-lg">SmartHub</CardTitle>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="secondary">$129 each</Badge>
                    <Badge variant="outline">WiFi Connected</Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSmartHubQuantityChange(-1)}
                  disabled={configuration.smartHubQuantity === 0}
                >
                  -
                </Button>
                <span className="text-lg font-semibold w-8 text-center">
                  {configuration.smartHubQuantity}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSmartHubQuantityChange(1)}
                >
                  +
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">
              Connect your blinds to WiFi for smartphone and voice control.
            </p>
            
            <Separator className="my-3" />
            
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <h4 className="font-semibold mb-2">✓ Works with:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Amazon Alexa</li>
                  <li>• Google Assistant</li>
                  <li>• Smartphone app</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">📡 Requirements:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• 2.4GHz WiFi</li>
                  <li>• iOS/Android app</li>
                  <li>• Internet connection</li>
                </ul>
              </div>
            </div>
            
            {configuration.smartHubQuantity > 0 && (
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800">
                  <strong>Total: {configuration.smartHubQuantity} × $129 = ${configuration.smartHubQuantity * 129}</strong>
                </p>
                <p className="text-xs text-green-600 mt-1">
                  Each SmartHub can control up to 15 blinds
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">💡 SmartHub Benefits</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Schedule blinds to open/close automatically</li>
          <li>• Control from anywhere in the world</li>
          <li>• Create scenes with multiple blinds</li>
          <li>• Voice control with Alexa or Google</li>
        </ul>
      </div>
    </div>
  );
};

export default AccessoriesStep;
