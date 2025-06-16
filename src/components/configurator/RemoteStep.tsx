
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface RemoteStepProps {
  configuration: any;
  updateConfiguration: (updates: any) => void;
}

const REMOTE_OPTIONS = [
  {
    id: false,
    title: 'No, I only need one',
    description: 'Use the included remote control',
    price: 0,
    icon: '📱',
  },
  {
    id: true,
    title: 'Yes, add additional remote',
    description: 'Perfect for multiple users or rooms',
    price: 129,
    icon: '📱📱',
  },
];

const RemoteStep = ({ configuration, updateConfiguration }: RemoteStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-semibold mb-4 block">Additional Remote Control</Label>
        <p className="text-sm text-gray-600 mb-6">
          Your motorised blind includes one remote. Would you like to add an additional remote?
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REMOTE_OPTIONS.map((option) => (
            <Card
              key={option.id.toString()}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                configuration.additionalRemote === option.id
                  ? 'ring-2 ring-blue-500 shadow-lg bg-blue-50'
                  : 'hover:shadow-md'
              }`}
              onClick={() => updateConfiguration({ additionalRemote: option.id })}
            >
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
                <p className="text-sm text-gray-600">{option.description}</p>
                {option.price === 0 && (
                  <p className="text-xs text-green-600 mt-2 font-medium">Included</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">📡 Remote Features</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• 15-channel remote control</li>
          <li>• Up to 30m range</li>
          <li>• Battery included</li>
          <li>• Easy programming</li>
        </ul>
      </div>
    </div>
  );
};

export default RemoteStep;
