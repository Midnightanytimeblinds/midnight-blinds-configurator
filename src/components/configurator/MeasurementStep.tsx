
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

interface MeasurementStepProps {
  configuration: any;
  updateConfiguration: (updates: any) => void;
}

const MeasurementStep = ({ configuration, updateConfiguration }: MeasurementStepProps) => {
  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    updateConfiguration({ width: value });
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    updateConfiguration({ height: value });
  };

  const currentWidth = configuration.width || 0;
  const currentHeight = configuration.height || 0;

  // Check if dimensions are within valid ranges
  const isWidthValid = currentWidth >= 530 && currentWidth <= 3000;
  const isHeightValid = currentHeight >= 300 && currentHeight <= 3900;
  const showRangeWarning = (currentWidth > 0 && !isWidthValid) || (currentHeight > 0 && !isHeightValid);

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
          <span className="mr-2">📏</span>
          Get your measurements
        </h3>
        <p className="text-sm text-blue-800 mb-2">
          Width is measured from one end of the window to the other. Height is measured from top to bottom. Need help measuring? See our 
          <a href="#" className="underline font-medium"> measuring guide</a>.
        </p>
      </div>

      {showRangeWarning && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-red-900 mb-2">⚠️ Size Limitations</h3>
          <p className="text-sm text-red-800">
            Please ensure your measurements are within our available ranges:
            <br />• Width: 530mm - 3000mm
            <br />• Height: 300mm - 3900mm
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Width Input */}
        <div className="space-y-3">
          <Label className="text-base font-semibold text-gray-900">Enter your width</Label>
          <div className="relative">
            <Input
              type="number"
              placeholder="Enter width"
              value={currentWidth || ''}
              onChange={handleWidthChange}
              className={`text-lg pr-12 h-12 ${!isWidthValid && currentWidth > 0 ? 'border-red-300 focus:border-red-500' : ''}`}
              min="530"
              max="3000"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
              mm
            </span>
          </div>
          <div className="text-sm text-gray-600 space-y-1">
            <p>• Range: 530mm - 3000mm</p>
            <p>• Take the shortest measurement for both blind</p>
            <p>• It is okay, round down to the nearest 1mm</p>
          </div>
        </div>

        {/* Height Input */}
        <div className="space-y-3">
          <Label className="text-base font-semibold text-gray-900">Enter your height</Label>
          <div className="relative">
            <Input
              type="number"
              placeholder="Enter height"
              value={currentHeight || ''}
              onChange={handleHeightChange}
              className={`text-lg pr-12 h-12 ${!isHeightValid && currentHeight > 0 ? 'border-red-300 focus:border-red-500' : ''}`}
              min="300"
              max="3900"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
              mm
            </span>
          </div>
          <div className="text-sm text-gray-600 space-y-1">
            <p>• Range: 300mm - 3900mm</p>
            <p>• Check for obstructions in your header</p>
            <p>• Measure at least 3-4 feet from edges</p>
            <p>• It is okay, round down to the nearest 1mm</p>
          </div>
        </div>
      </div>

      {/* Measurement Guarantee */}
      <Card className="border-2 border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="bg-blue-100 rounded-full p-2 mt-1">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 1-18 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <Checkbox
                  id="measurement-guarantee"
                  checked={configuration.measurementGuarantee}
                  onCheckedChange={(checked) => 
                    updateConfiguration({ measurementGuarantee: checked })
                  }
                />
                <Label htmlFor="measurement-guarantee" className="text-base font-semibold cursor-pointer text-blue-900">
                  Add our Measure Guarantee (+$40 per blind)
                </Label>
              </div>
              <p className="text-sm text-blue-800">
                Double-check your window measurements will not destroy your blind. 
                If your blind doesn't fit, replace it for free.{' '}
                <a href="#" className="underline font-medium">Read more</a>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MeasurementStep;
