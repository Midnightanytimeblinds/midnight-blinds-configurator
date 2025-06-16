
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

interface ColorStepProps {
  configuration: any;
  updateConfiguration: (updates: any) => void;
}

const FRAME_COLORS = [
  { id: 'black', name: 'Black', image: '/lovable-uploads/2f469a3c-1062-40bd-aacd-4e621fdb5388.png' },
  { id: 'white', name: 'White', image: '/lovable-uploads/ffd77d8d-0bd1-443f-9a80-9b76254c2223.png' },
  { id: 'silver', name: 'Silver', image: '/lovable-uploads/ffd77d8d-0bd1-443f-9a80-9b76254c2223.png' },
  { id: 'cream', name: 'Cream', image: '/lovable-uploads/ffd77d8d-0bd1-443f-9a80-9b76254c2223.png' },
];

const FABRIC_TYPES = [
  { id: 'duo-blockout', name: 'DUO Blockout', description: 'Premium blockout with textured weave' },
  { id: 'lereve-blockout', name: 'LeReve Blockout', description: 'Elegant blockout with woven pattern' },
];

const FABRIC_COLORS = {
  'duo-blockout': [
    { id: 'duo-black', name: 'Charcoal Black', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop' },
    { id: 'duo-dark-grey', name: 'Dark Grey', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop' },
    { id: 'duo-medium-grey', name: 'Medium Grey', image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop' },
    { id: 'duo-light-grey', name: 'Light Grey', image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop' },
    { id: 'duo-cream', name: 'Cream', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop' },
  ],
  'lereve-blockout': [
    { id: 'lereve-black', name: 'Deep Black', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop' },
    { id: 'lereve-charcoal', name: 'Charcoal', image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop' },
    { id: 'lereve-dark-grey', name: 'Dark Grey', image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop' },
    { id: 'lereve-medium-grey', name: 'Medium Grey', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop' },
    { id: 'lereve-light-grey', name: 'Light Grey', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop' },
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
                <div className="w-12 h-12 rounded mx-auto mb-2 border overflow-hidden">
                  <img
                    src={color.image}
                    alt={color.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-medium">{color.name}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Fabric Type Selection */}
      <div>
        <Label className="text-base font-semibold mb-4 block">Blockout Fabric</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <div className="w-full h-16 rounded mb-2 border overflow-hidden">
                    <img
                      src={fabric.image}
                      alt={fabric.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
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
