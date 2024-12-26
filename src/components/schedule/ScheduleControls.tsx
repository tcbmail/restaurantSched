import React from 'react';
import { ChevronLeft, ChevronRight, Calendar, Download } from 'lucide-react';
import { format } from 'date-fns';

interface ScheduleControlsProps {
  currentDate: Date;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
  onGenerateSchedule: () => void;
  onExportSchedule: () => void;
}

const ScheduleControls = ({
  currentDate,
  onPreviousWeek,
  onNextWeek,
  onGenerateSchedule,
  onExportSchedule,
}: ScheduleControlsProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-4">
        <button
          onClick={onPreviousWeek}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-indigo-600" />
          <span className="font-medium">
            {format(currentDate, 'MMMM d, yyyy')}
          </span>
        </div>
        <button
          onClick={onNextWeek}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onGenerateSchedule}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Generate Schedule
        </button>
        <button
          onClick={onExportSchedule}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          <Download className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ScheduleControls;