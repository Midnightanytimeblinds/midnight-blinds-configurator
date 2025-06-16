
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

interface ColorStepProps {
  configuration: any;
  updateConfiguration: (updates: any) => void;
}

const FRAME_COLORS = [
  { id: 'white', name: 'White', color: '#FFFFFF', border: '#E5E7EB' },
  { id: 'black', name: 'Black', color: '#000000' },
  { id: 'silver', name: 'Silver', color: '#C0C0C0' },
  { id: 'bronze', name: 'Bronze', color: '#CD7F32' },
];

const FABRIC_COLORS = [
  { id: 'bo-duo', name: 'BO - Duo', color: '#2C3E50', description: 'Deep charcoal with subtle texture' },
  { id: 'bo-white', name: 'BO - White', color: '#FFFFFF', border: '#E5E7EB', description: 'Pure white blackout' },
  { id: 'bo-cream', name: 'BO - Cream', color: '#F5F5DC', description: 'Warm cream tone' },
  { id: 'bo-grey', name: 'BO - Grey', color: '#808080', description: 'Classic grey' },
];

const ColorStep = ({ configuration, updateConfiguration }: ColorStepProps) => {
  return (
    <div className="space-y-8">
      {/* Frame Color Selection */}
      <div>
        <Label className="text-base font-semibold mb-4 block">Frame Colour</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {FRAME_COLORS.map((color) => (
            <Card
              key={color.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                configuration.frameColor === color.id
                  ? 'ring-2 ring-blue-500 shadow-md'
                  : 'hover:shadow-sm'
              }`}
              onClick={() => updateConfiguration({ frameColor: color.id })}
            >
              <CardContent className="p-4 text-center">
                <div
                  className="w-12 h-12 rounded-full mx-auto mb-2 border-2"
                  style={{
                    backgroundColor: color.color,
                    borderColor: color.border || color.color,
                  }}
                />
                <span className="text-sm font-medium">{color.name}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Fabric Color Selection */}
      <div>
        <Label className="text-base font-semibold mb-4 block">Fabric Colour</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FABRIC_COLORS.map((fabric) => (
            <Card
              key={fabric.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                configuration.fabricColor === fabric.id
                  ? 'ring-2 ring-blue-500 shadow-md'
                  : 'hover:shadow-sm'
              }`}
              onClick={() => updateConfiguration({ fabricColor: fabric.id })}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-16 h-16 rounded-lg border-2 flex-shrink-0"
                    style={{
                      backgroundColor: fabric.color,
                      borderColor: fabric.border || fabric.color,
                    }}
                  />
                  <div>
                    <h3 className="font-semibold text-sm">{fabric.name}</h3>
                    <p className="text-xs text-gray-600 mt-1">{fabric.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorStep;
