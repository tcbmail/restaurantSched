import React from 'react';
import { Clock } from 'lucide-react';

interface EmployeeHoursProps {
  isFullTime: boolean;
  desiredHours: number;
  onUpdate: (updates: { isFullTime: boolean; desiredHours: number }) => void;
}

const EmployeeHours = ({ isFullTime, desiredHours, onUpdate }: EmployeeHoursProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-indigo-600" />
        Work Hours
      </h3>

      <div className="space-y-4">
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isFullTime}
              onChange={(e) => onUpdate({ isFullTime: e.target.checked, desiredHours })}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-sm text-gray-700">Full Time Employee</span>
          </label>
        </div>

        {!isFullTime && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Desired Weekly Hours
            </label>
            <input
              type="number"
              min="0"
              max="40"
              value={desiredHours}
              onChange={(e) => onUpdate({ isFullTime, desiredHours: parseInt(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <p className="mt-1 text-sm text-gray-500">
              Enter the number of hours you'd like to work per week
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeHours;