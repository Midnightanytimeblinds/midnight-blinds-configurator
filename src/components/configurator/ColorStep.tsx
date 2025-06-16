
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
  { id: 'duo-blockout', name: 'DUO Blockout', description: 'Premium blockout with textured weave' },
  { id: 'lereve-blockout', name: 'LeReve Blockout', description: 'Elegant blockout with woven pattern' },
];

const FABRIC_COLORS = {
  'duo-blockout': [
    { id: 'duo-black', name: 'Charcoal Black', image: '/lovable-uploads/e8f5b3d8-5a8e-4b7a-9c2d-1e3f4a5b6c7d.png' },
    { id: 'duo-dark-grey', name: 'Dark Grey', image: '/lovable-uploads/f9a6c4e9-6b9f-5c8a-ad3e-2f4g5h6i7j8k.png' },
    { id: 'duo-medium-grey', name: 'Medium Grey', image: '/lovable-uploads/a1b2c3d4-7c0d-6d9b-be4f-3g5h6i7j8k9l.png' },
    { id: 'duo-light-grey', name: 'Light Grey', image: '/lovable-uploads/b2c3d4e5-8d1e-7e0c-cf5g-4h6i7j8k9l0m.png' },
    { id: 'duo-cream', name: 'Cream', image: '/lovable-uploads/c3d4e5f6-9e2f-8f1d-dg6h-5i7j8k9l0m1n.png' },
  ],
  'lereve-blockout': [
    { id: 'lereve-black', name: 'Deep Black', image: '/lovable-uploads/d4e5f6g7-0f3g-9g2e-eh7i-6j8k9l0m1n2o.png' },
    { id: 'lereve-charcoal', name: 'Charcoal', image: '/lovable-uploads/e5f6g7h8-1g4h-0h3f-fi8j-7k9l0m1n2o3p.png' },
    { id: 'lereve-dark-grey', name: 'Dark Grey', image: '/lovable-uploads/f6g7h8i9-2h5i-1i4g-gj9k-8l0m1n2o3p4q.png' },
    { id: 'lereve-medium-grey', name: 'Medium Grey', image: '/lovable-uploads/g7h8i9j0-3i6j-2j5h-hk0l-9m1n2o3p4q5r.png' },
    { id: 'lereve-light-grey', name: 'Light Grey', image: '/lovable-uploads/h8i9j0k1-4j7k-3k6i-il1m-0n2o3p4q5r6s.png' },
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
