
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface MeasurementStepProps {
  configuration: any;
  updateConfiguration: (updates: any) => void;
}

// Generate options for dropdowns
const generateCmOptions = (max: number) => {
  return Array.from({ length: max }, (_, i) => i + 1);
};

const generateMmOptions = () => {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
};

const MeasurementStep = ({ configuration, updateConfiguration }: MeasurementStepProps) => {
  const handleWidthCmChange = (value: string) => {
    updateConfiguration({
      width: { ...configuration.width, cm: parseInt(value) }
    });
  };

  const handleWidthMmChange = (value: string) => {
    updateConfiguration({
      width: { ...configuration.width, mm: parseInt(value) }
    });
  };

  const handleHeightCmChange = (value: string) => {
    updateConfiguration({
      height: { ...configuration.height, cm: parseInt(value) }
    });
  };

  const handleHeightMmChange = (value: string) => {
    updateConfiguration({
      height: { ...configuration.height, mm: parseInt(value) }
    });
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Width */}
        <Card>
          <CardContent className="p-6">
            <Label className="text-base font-semibold mb-4 block">Width</Label>
            <div className="flex space-x-3">
              <div className="flex-1">
                <Label className="text-sm text-gray-600 mb-2 block">Centimetres</Label>
                <Select value={configuration.width.cm?.toString() || ""} onValueChange={handleWidthCmChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select cm" />
                  </SelectTrigger>
                  <SelectContent>
                    {generateCmOptions(300).map(cm => (
                      <SelectItem key={cm} value={cm.toString()}>{cm} cm</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Label className="text-sm text-gray-600 mb-2 block">Millimetres</Label>
                <Select value={configuration.width.mm?.toString() || ""} onValueChange={handleWidthMmChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select mm" />
                  </SelectTrigger>
                  <SelectContent>
                    {generateMmOptions().map(mm => (
                      <SelectItem key={mm} value={mm.toString()}>{mm} mm</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Height */}
        <Card>
          <CardContent className="p-6">
            <Label className="text-base font-semibold mb-4 block">Height</Label>
            <div className="flex space-x-3">
              <div className="flex-1">
                <Label className="text-sm text-gray-600 mb-2 block">Centimetres</Label>
                <Select value={configuration.height.cm?.toString() || ""} onValueChange={handleHeightCmChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select cm" />
                  </SelectTrigger>
                  <SelectContent>
                    {generateCmOptions(300).map(cm => (
                      <SelectItem key={cm} value={cm.toString()}>{cm} cm</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Label className="text-sm text-gray-600 mb-2 block">Millimetres</Label>
                <Select value={configuration.height.mm?.toString() || ""} onValueChange={handleHeightMmChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select mm" />
                  </SelectTrigger>
                  <SelectContent>
                    {generateMmOptions().map(mm => (
                      <SelectItem key={mm} value={mm.toString()}>{mm} mm</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Measurement Guarantee */}
      <Card className="bg-amber-50 border-amber-200">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="measurement-guarantee"
              checked={configuration.measurementGuarantee}
              onCheckedChange={(checked) => 
                updateConfiguration({ measurementGuarantee: checked })
              }
            />
            <div className="flex-1">
              <Label htmlFor="measurement-guarantee" className="text-base font-semibold cursor-pointer">
                Measurement Guarantee (+$40)
              </Label>
              <p className="text-sm text-gray-600 mt-1">
                We'll remake your blind for free if our measurements don't fit perfectly.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Measurement Tips */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">📏 Measuring Tips</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Measure to the nearest millimetre for best fit</li>
          <li>• For inside mounts, measure the exact window opening</li>
          <li>• For outside mounts, add 10-15cm to each side for optimal coverage</li>
          <li>• Double-check all measurements before proceeding</li>
        </ul>
      </div>
    </div>
  );
};

export default MeasurementStep;
