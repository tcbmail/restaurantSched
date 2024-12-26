import React from 'react';
import { format, startOfWeek, addDays } from 'date-fns';

interface TimeGridProps {
  currentDate: Date;
  onTimeSlotClick: (date: Date) => void;
}

const TimeGrid = ({ currentDate, onTimeSlotClick }: TimeGridProps) => {
  const weekStart = startOfWeek(currentDate);
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-8 min-w-[800px]">
        {/* Time column */}
        <div className="border-r">
          <div className="h-12 border-b"></div>
          {hours.map((hour) => (
            <div key={hour} className="h-16 border-b px-2 py-1 text-sm text-gray-500">
              {format(new Date().setHours(hour, 0), 'h a')}
            </div>
          ))}
        </div>

        {/* Days columns */}
        {days.map((day) => (
          <div key={day.toString()} className="border-r">
            <div className="h-12 border-b p-2 text-center">
              <div className="font-medium">{format(day, 'EEEE')}</div>
              <div className="text-sm text-gray-500">{format(day, 'MMM d')}</div>
            </div>
            {hours.map((hour) => (
              <div 
                key={hour} 
                className="h-16 border-b hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => {
                  const selectedDateTime = new Date(day);
                  selectedDateTime.setHours(hour);
                  onTimeSlotClick(selectedDateTime);
                }}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeGrid;