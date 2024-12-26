import React from 'react';
import WeekSelector from './WeekSelector';
import TimeGrid from './TimeGrid';

interface WeeklyScheduleProps {
  currentDate: Date;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
  onTimeSlotClick: (date: Date) => void;
}

const WeeklySchedule = ({ 
  currentDate, 
  onPreviousWeek, 
  onNextWeek,
  onTimeSlotClick 
}: WeeklyScheduleProps) => {
  return (
    <div className="bg-white rounded-lg shadow">
      <WeekSelector
        currentDate={currentDate}
        onPreviousWeek={onPreviousWeek}
        onNextWeek={onNextWeek}
      />
      <TimeGrid
        currentDate={currentDate}
        onTimeSlotClick={onTimeSlotClick}
      />
    </div>
  );
};

export default WeeklySchedule;