import React from 'react';
import { Award } from 'lucide-react';

interface CertificationsProps {
  certifications: {
    foodSafety?: {
      certified: boolean;
      expirationDate?: string;
      certificationNumber?: string;
    };
  };
  onChange: (certifications: any) => void;
}

const Certifications = ({ certifications, onChange }: CertificationsProps) => {
  const handleFoodSafetyChange = (field: string, value: any) => {
    onChange({
      ...certifications,
      foodSafety: {
        ...certifications.foodSafety,
        [field]: value
      }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
        <Award className="h-5 w-5 text-indigo-600" />
        Certifications
      </h3>

      <div className="space-y-4">
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={certifications.foodSafety?.certified || false}
              onChange={(e) => handleFoodSafetyChange('certified', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-sm text-gray-700">Food Safety Certified</span>
          </label>
        </div>

        {certifications.foodSafety?.certified && (
          <div className="space-y-4 pl-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Certification Number
              </label>
              <input
                type="text"
                value={certifications.foodSafety?.certificationNumber || ''}
                onChange={(e) => handleFoodSafetyChange('certificationNumber', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Expiration Date
              </label>
              <input
                type="date"
                value={certifications.foodSafety?.expirationDate || ''}
                onChange={(e) => handleFoodSafetyChange('expirationDate', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Certifications;