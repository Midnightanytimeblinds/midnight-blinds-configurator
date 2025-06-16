
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

interface MountStepProps {
  configuration: any;
  updateConfiguration: (updates: any) => void;
}

const MOUNT_OPTIONS = [
  {
    id: 'inside',
    title: 'Inside Mount',
    description: 'Blind fits inside the window frame',
    details: 'Perfect for windows with deep frames. Provides a clean, built-in look.',
    illustration: '🪟',
  },
  {
    id: 'outside',
    title: 'Outside Mount',
    description: 'Blind mounts on the wall above the window',
    details: 'Great for shallow frames or when you want maximum light blocking.',
    illustration: '🏠',
  },
];

const MountStep = ({ configuration, updateConfiguration }: MountStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-semibold mb-4 block">Choose your mount style</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOUNT_OPTIONS.map((option) => (
            <Card
              key={option.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                configuration.mountType === option.id
                  ? 'ring-2 ring-blue-500 shadow-lg bg-blue-50'
                  : 'hover:shadow-md'
              }`}
              onClick={() => updateConfiguration({ mountType: option.id })}
            >
              <CardHeader className="text-center pb-2">
                <div className="text-4xl mb-2">{option.illustration}</div>
                <CardTitle className="text-lg">{option.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-gray-600 mb-2">{option.description}</p>
                <p className="text-xs text-gray-500">{option.details}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Educational content */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">💡 Mounting Tips</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Inside mounts require at least 2.5cm frame depth</li>
          <li>• Outside mounts provide better light blocking</li>
          <li>• Consider your window frame style and personal preference</li>
        </ul>
      </div>
    </div>
  );
};

export default MountStep;
