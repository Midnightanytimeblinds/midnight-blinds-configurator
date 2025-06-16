
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

const FABRIC_TYPES = [
  { id: 'blockout', name: 'Blockout', description: 'Complete light blocking' },
  { id: 'privacy', name: 'Privacy', description: 'Light filtering with privacy' },
  { id: 'sheer', name: 'Sheer', description: 'Light filtering with view' },
];

const FABRIC_COLORS = {
  blockout: [
    { id: 'blockout-white', name: 'White', color: '#FFFFFF', border: '#E5E7EB' },
    { id: 'blockout-cream', name: 'Cream', color: '#F5F5DC' },
    { id: 'blockout-beige', name: 'Beige', color: '#F5F5DC' },
    { id: 'blockout-grey', name: 'Grey', color: '#808080' },
    { id: 'blockout-charcoal', name: 'Charcoal', color: '#36454F' },
    { id: 'blockout-black', name: 'Black', color: '#000000' },
    { id: 'blockout-navy', name: 'Navy', color: '#000080' },
    { id: 'blockout-brown', name: 'Brown', color: '#8B4513' },
    { id: 'blockout-taupe', name: 'Taupe', color: '#D2B48C' },
    { id: 'blockout-ivory', name: 'Ivory', color: '#FFFFF0' },
  ],
  privacy: [
    { id: 'privacy-white', name: 'White', color: '#FFFFFF', border: '#E5E7EB' },
    { id: 'privacy-cream', name: 'Cream', color: '#F5F5DC' },
    { id: 'privacy-light-grey', name: 'Light Grey', color: '#D3D3D3' },
    { id: 'privacy-grey', name: 'Grey', color: '#808080' },
    { id: 'privacy-charcoal', name: 'Charcoal', color: '#36454F' },
    { id: 'privacy-beige', name: 'Beige', color: '#F5F5DC' },
    { id: 'privacy-taupe', name: 'Taupe', color: '#D2B48C' },
    { id: 'privacy-brown', name: 'Brown', color: '#8B4513' },
    { id: 'privacy-sage', name: 'Sage', color: '#9CAF88' },
    { id: 'privacy-linen', name: 'Linen', color: '#FAF0E6' },
  ],
  sheer: [
    { id: 'sheer-white', name: 'White', color: '#FFFFFF', border: '#E5E7EB' },
    { id: 'sheer-ivory', name: 'Ivory', color: '#FFFFF0' },
    { id: 'sheer-cream', name: 'Cream', color: '#F5F5DC' },
    { id: 'sheer-champagne', name: 'Champagne', color: '#F7E7CE' },
    { id: 'sheer-light-grey', name: 'Light Grey', color: '#D3D3D3' },
    { id: 'sheer-grey', name: 'Grey', color: '#808080' },
    { id: 'sheer-linen', name: 'Linen', color: '#FAF0E6' },
    { id: 'sheer-natural', name: 'Natural', color: '#F5F5DC' },
    { id: 'sheer-pearl', name: 'Pearl', color: '#EAE0C8' },
    { id: 'sheer-sand', name: 'Sand', color: '#F4A460' },
  ],
};

const ColorStep = ({ configuration, updateConfiguration }: ColorStepProps) => {
  const selectedFabricColors = configuration.fabricType ? FABRIC_COLORS[configuration.fabricType as keyof typeof FABRIC_COLORS] : [];

  const handleFabricTypeChange = (fabricType: string) => {
    updateConfiguration({ 
      fabricType, 
      fabricColor: '' // Reset fabric color when type changes
    });
  };

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

      {/* Fabric Type Selection */}
      <div>
        <Label className="text-base font-semibold mb-4 block">Fabric Type</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {FABRIC_TYPES.map((type) => (
            <Card
              key={type.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                configuration.fabricType === type.id
                  ? 'ring-2 ring-blue-500 shadow-md'
                  : 'hover:shadow-sm'
              }`}
              onClick={() => handleFabricTypeChange(type.id)}
            >
              <CardContent className="p-4 text-center">
                <h3 className="font-semibold text-sm mb-1">{type.name}</h3>
                <p className="text-xs text-gray-600">{type.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Fabric Color Selection */}
      {configuration.fabricType && (
        <div>
          <Label className="text-base font-semibold mb-4 block">
            {FABRIC_TYPES.find(t => t.id === configuration.fabricType)?.name} Colours
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {selectedFabricColors.map((fabric) => (
              <Card
                key={fabric.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  configuration.fabricColor === fabric.id
                    ? 'ring-2 ring-blue-500 shadow-md'
                    : 'hover:shadow-sm'
                }`}
                onClick={() => updateConfiguration({ fabricColor: fabric.id })}
              >
                <CardContent className="p-3 text-center">
                  <div
                    className="w-10 h-10 rounded mx-auto mb-2 border"
                    style={{
                      backgroundColor: fabric.color,
                      borderColor: fabric.border || fabric.color,
                    }}
                  />
                  <span className="text-xs font-medium">{fabric.name}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorStep;
