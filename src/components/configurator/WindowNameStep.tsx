
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface WindowNameStepProps {
  configuration: any;
  updateConfiguration: (updates: any) => void;
}

const EXAMPLE_NAMES = [
  'Bedroom Left',
  'Living Room Main',
  'Kitchen Window',
  'Master Bedroom',
  'Office Window',
  'Guest Room',
];

const WindowNameStep = ({ configuration, updateConfiguration }: WindowNameStepProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <Label htmlFor="window-name" className="text-base font-semibold mb-4 block">
            Name your window
          </Label>
          <p className="text-sm text-gray-600 mb-4">
            Give your blind a memorable name to help identify it later.
          </p>
          
          <Input
            id="window-name"
            type="text"
            placeholder="e.g. Bedroom Left"
            value={configuration.windowName}
            onChange={(e) => updateConfiguration({ windowName: e.target.value })}
            className="text-lg"
          />
        </CardContent>
      </Card>

      {/* Quick name suggestions */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Quick suggestions:</Label>
        <div className="flex flex-wrap gap-2">
          {EXAMPLE_NAMES.map((name) => (
            <button
              key={name}
              onClick={() => updateConfiguration({ windowName: name })}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-green-50 rounded-lg p-4">
        <h3 className="font-semibold text-green-900 mb-2">🎉 Almost Done!</h3>
        <p className="text-sm text-green-800">
          Your custom blind configuration is complete. Review your order summary and add to cart when ready.
        </p>
      </div>
    </div>
  );
};

export default WindowNameStep;
