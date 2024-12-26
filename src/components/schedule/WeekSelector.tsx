import React from 'react';
import { format, startOfWeek } from 'date-fns';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface WeekSelectorProps {
  currentDate: Date;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
}

const WeekSelector = ({ currentDate, onPreviousWeek, onNextWeek }: WeekSelectorProps) => {
  const weekStart = startOfWeek(currentDate);
  
  return (
    <div className="p-4 border-b flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Calendar className="h-5 w-5 text-indigo-500" />
        <h2 className="text-lg font-semibold">
          Week of {format(weekStart, 'MMMM d, yyyy')}
        </h2>
      </div>
      <div className="flex gap-2">
        <button 
          onClick={onPreviousWeek}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Previous week"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button 
          onClick={onNextWeek}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Next week"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default WeekSelector;