import React from 'react';
import { Clock } from 'lucide-react';
import { format } from 'date-fns';
import type { Employee } from '../../types';

interface ShiftPreferencesProps {
  employee: Employee;
  onUpdate: (preferences: any) => void;
}

const ShiftPreferences = ({ employee, onUpdate }: ShiftPreferencesProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-indigo-600" />
        Shift Preferences
      </h3>

      <div className="space-y-4">
        {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => (
          <div key={day} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {day} Availability
              </label>
              <div className="mt-1 flex gap-2">
                <input
                  type="time"
                  className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  defaultValue={employee.availableHours[index]?.startTime}
                  onChange={(e) => {
                    const newPreferences = [...employee.availableHours];
                    newPreferences[index] = {
                      ...newPreferences[index],
                      startTime: e.target.value
                    };
                    onUpdate(newPreferences);
                  }}
                />
                <span className="flex items-center">to</span>
                <input
                  type="time"
                  className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  defaultValue={employee.availableHours[index]?.endTime}
                  onChange={(e) => {
                    const newPreferences = [...employee.availableHours];
                    newPreferences[index] = {
                      ...newPreferences[index],
                      endTime: e.target.value
                    };
                    onUpdate(newPreferences);
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShiftPreferences;