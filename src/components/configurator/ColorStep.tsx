

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';

interface ColorStepProps {
  configuration: any;
  updateConfiguration: (updates: any) => void;
}

const FRAME_COLORS = [
  { id: 'black', name: 'Black', image: '/lovable-uploads/2f469a3c-1062-40bd-aacd-4e621fdb5388.png' },
  { id: 'white', name: 'White', image: '/lovable-uploads/3ec9eda3-0fe9-4122-b277-9760690fe1a4.png' },
  { id: 'silver', name: 'Silver', image: '/lovable-uploads/b31a940e-8261-4cac-857d-157d8231606e.png' },
  { id: 'cream', name: 'Cream', image: '/lovable-uploads/dafb5173-6416-48bf-925d-e9e949bb2969.png' },
];

const FABRIC_TYPES = [
  { id: 'duo-blockout', name: 'DUO Blockout', description: 'Premium blockout with textured weave' },
  { id: 'lereve-blockout', name: 'LeReve Blockout', description: 'Elegant blockout with woven pattern' },
];

const FABRIC_COLORS = {
  'duo-blockout': [
    { id: 'duo-aztec', name: 'Aztec', image: '/lovable-uploads/76e5cbb7-cc79-412b-b223-cd65e466e8f6.png' },
    { id: 'duo-graphite', name: 'Graphite', image: '/lovable-uploads/7a78abd3-b3aa-456f-b396-8bdeadfb611a.png' },
    { id: 'duo-linen', name: 'Linen', image: '/lovable-uploads/739df3c8-b03c-47c5-b248-edb703766ee4.png' },
    { id: 'duo-charcoal', name: 'Charcoal', image: '/lovable-uploads/2d6c4dc5-5765-494c-832d-e5eda96ea806.png' },
    { id: 'duo-stone', name: 'Stone', image: '/lovable-uploads/246960fd-7b4d-42df-86d9-04d77e6de010.png' },
    { id: 'duo-silver', name: 'Silver', image: '/lovable-uploads/1b884d9e-541f-4e60-8f2b-142052a243d1.png' },
    { id: 'duo-pearl', name: 'Pearl', image: '/lovable-uploads/020b87c0-cbee-43dc-a1a0-789f14918729.png' },
    { id: 'duo-sandstone', name: 'Sandstone', image: '/lovable-uploads/9c7cfdc4-7d8b-4e55-aa94-0092793c1060.png' },
    { id: 'duo-canvas', name: 'Canvas', image: '/lovable-uploads/e5517323-ef2f-41a4-8b48-70032f2dbe08.png' },
    { id: 'duo-champagne', name: 'Champagne', image: '/lovable-uploads/92df69be-6dd3-411a-90fb-a04bff82c61a.png' },
  ],
  'lereve-blockout': [
    { id: 'lereve-stone', name: 'Stone', image: '/lovable-uploads/1401966e-ac6e-4b62-89dd-89521614e71f.png' },
    { id: 'lereve-sandstone', name: 'Sandstone', image: '/lovable-uploads/d2ec0047-7e20-4078-9b51-d343380240cd.png' },
    { id: 'lereve-canvas', name: 'Canvas', image: '/lovable-uploads/a7958b9e-ee35-449b-9a0f-ed1368e4622a.png' },
    { id: 'lereve-linen', name: 'Linen', image: '/lovable-uploads/53695bb3-4e06-4efa-9cff-36c093489242.png' },
    { id: 'lereve-silver', name: 'Silver', image: '/lovable-uploads/6d11238f-055a-486a-bbc2-98f43871e801.png' },
    { id: 'lereve-graphite', name: 'Graphite', image: '/lovable-uploads/46a861bd-9177-4988-9c88-74caf049ba7f.png' },
    { id: 'lereve-charcoal', name: 'Charcoal', image: '/lovable-uploads/91246e39-2f12-4faf-bc47-c5ae07b1c8bc.png' },
    { id: 'lereve-aztec', name: 'Aztec', image: '/lovable-uploads/c6b302f2-b480-45dd-b558-4046a4cf9042.png' },
    { id: 'lereve-pearl', name: 'Pearl', image: '/lovable-uploads/73bd9dab-e540-47ff-8edd-d5f37af4bcfb.png' },
    { id: 'lereve-champagne', name: 'Champagne', image: '/lovable-uploads/009f9855-a167-4078-8557-c6d4c1438e77.png' },
  ],
};

const ColorStep = ({ configuration, updateConfiguration }: ColorStepProps) => {
  const [selectedSwatchForPreview, setSelectedSwatchForPreview] = useState<{ name: string; image: string } | null>(null);
  const selectedFabricColors = configuration.fabricType ? FABRIC_COLORS[configuration.fabricType as keyof typeof FABRIC_COLORS] : [];

  const handleFabricTypeChange = (fabricType: string) => {
    console.log('Fabric type changing to:', fabricType);
    updateConfiguration({ 
      fabricType, 
      fabricColor: '' // Reset fabric color when type changes
    });
  };

  const handleSwatchClick = (fabric: { name: string; image: string }, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedSwatchForPreview(fabric);
  };

  const handleFabricSelect = (fabricId: string) => {
    console.log('Fabric color selected:', fabricId);
    updateConfiguration({ fabricColor: fabricId });
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
          <div className="text-sm text-gray-600 mb-3">
            Click a swatch to select it, or click the <Plus className="inline w-3 h-3" /> icon to view texture details
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {selectedFabricColors.map((fabric) => (
              <Card
                key={fabric.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  configuration.fabricColor === fabric.id
                    ? 'ring-2 ring-blue-500 shadow-md'
                    : 'hover:shadow-sm'
                }`}
                onClick={() => handleFabricSelect(fabric.id)}
              >
                <CardContent className="p-3 text-center">
                  <div className="w-full h-16 rounded mb-2 border overflow-hidden relative group bg-white">
                    <img
                      src={fabric.image}
                      alt={fabric.name}
                      className="w-full h-full object-cover object-center"
                      style={{ 
                        imageRendering: 'pixelated',
                        msInterpolationMode: 'nearest-neighbor'
                      }}
                      onLoad={(e) => {
                        // Ensure image displays properly once loaded
                        const img = e.target as HTMLImageElement;
                        img.style.imageRendering = 'auto';
                      }}
                    />
                    <button
                      onClick={(e) => handleSwatchClick(fabric, e)}
                      className="absolute top-1 right-1 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm"
                      title="View texture details"
                    >
                      <Plus className="w-3 h-3 text-gray-700" />
                    </button>
                  </div>
                  <span className="text-xs font-medium">{fabric.name}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Swatch Preview Modal */}
      <Dialog open={!!selectedSwatchForPreview} onOpenChange={() => setSelectedSwatchForPreview(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedSwatchForPreview?.name} Fabric Detail</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center">
            <img
              src={selectedSwatchForPreview?.image}
              alt={selectedSwatchForPreview?.name}
              className="max-w-full max-h-96 object-contain rounded-lg border"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ColorStep;

