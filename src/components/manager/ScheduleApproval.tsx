import React, { useState } from 'react';
import { Calendar, Check, X, AlertTriangle } from 'lucide-react';
import { useScheduleStore } from '../../stores/scheduleStore';
import { validateScheduleCoverage } from '../../utils/schedule';

const ScheduleApproval = () => {
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const { schedules } = useScheduleStore();
  
  const validation = validateScheduleCoverage(schedules, [], selectedWeek);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Schedule Approval</h2>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-red-600 border border-red-300 rounded hover:bg-red-50">
            <X className="h-4 w-4" />
          </button>
          <button className="px-3 py-1 text-green-600 border border-green-300 rounded hover:bg-green-50">
            <Check className="h-4 w-4" />
          </button>
        </div>
      </div>

      {!validation.isValid && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
          <div className="flex items-center gap-2 text-yellow-800">
            <AlertTriangle className="h-5 w-5" />
            <span className="font-medium">Schedule Warnings</span>
          </div>
          <ul className="mt-2 text-sm text-yellow-700 list-disc list-inside">
            {validation.errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-4">
        {/* Schedule preview will go here */}
      </div>
    </div>
  );
};

export default ScheduleApproval;