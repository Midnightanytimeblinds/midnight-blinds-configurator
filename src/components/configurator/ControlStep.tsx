
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface ControlStepProps {
  configuration: any;
  updateConfiguration: (updates: any) => void;
}

const CONTROL_OPTIONS = [
  {
    id: 'manual',
    title: 'Manual Control',
    description: 'Traditional cord or chain operation',
    price: 0,
    features: ['Simple operation', 'No power required', 'Reliable mechanism'],
    icon: '🔧',
  },
  {
    id: 'motorised',
    title: 'Motorised',
    description: 'Electric motor with remote control',
    price: 299,
    features: ['Remote operation', 'Quiet motor', 'Includes 1 remote'],
    icon: '⚡',
    badge: 'Popular',
  },
];

const ControlStep = ({ configuration, updateConfiguration }: ControlStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-semibold mb-4 block">Choose your control type</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CONTROL_OPTIONS.map((option) => (
            <Card
              key={option.id}
              className={`cursor-pointer transition-all hover:shadow-lg relative ${
                configuration.controlType === option.id
                  ? 'ring-2 ring-blue-500 shadow-lg bg-blue-50'
                  : 'hover:shadow-md'
              }`}
              onClick={() => updateConfiguration({ controlType: option.id })}
            >
              {option.badge && (
                <Badge className="absolute -top-2 -right-2 bg-green-500">
                  {option.badge}
                </Badge>
              )}
              <CardHeader className="text-center pb-2">
                <div className="text-4xl mb-2">{option.icon}</div>
                <CardTitle className="text-lg flex items-center justify-center space-x-2">
                  <span>{option.title}</span>
                  {option.price > 0 && (
                    <Badge variant="secondary">+${option.price}</Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-gray-600 mb-3">{option.description}</p>
                <ul className="text-xs text-gray-500 space-y-1">
                  {option.features.map((feature, index) => (
                    <li key={index}>✓ {feature}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Additional info for motorised */}
      {configuration.controlType === 'motorised' && (
        <div className="bg-green-50 rounded-lg p-4">
          <h3 className="font-semibold text-green-900 mb-2">🎉 Great Choice!</h3>
          <p className="text-sm text-green-800">
            Your motorised blind includes one remote control. You can add additional remotes in the next step.
          </p>
        </div>
      )}
    </div>
  );
};

export default ControlStep;
