import React, { useState, useCallback } from 'react';
import { addWeeks, subWeeks, startOfWeek, endOfWeek, format } from 'date-fns';
import WeeklySchedule from '../components/schedule/WeeklySchedule';
import { useScheduleStore } from '../stores/scheduleStore';

const Schedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { generateSchedule } = useScheduleStore();

  const handlePreviousWeek = useCallback(() => {
    setCurrentDate(prevDate => subWeeks(prevDate, 1));
  }, []);

  const handleNextWeek = useCallback(() => {
    setCurrentDate(prevDate => addWeeks(prevDate, 1));
  }, []);

  const handleGenerateSchedule = useCallback(async () => {
    const weekStart = format(startOfWeek(currentDate), 'yyyy-MM-dd');
    const weekEnd = format(endOfWeek(currentDate), 'yyyy-MM-dd');
    
    try {
      await generateSchedule(weekStart, weekEnd);
    } catch (error) {
      console.error('Failed to generate schedule:', error);
    }
  }, [currentDate, generateSchedule]);

  const handleTimeSlotClick = useCallback((date: Date) => {
    console.log('Selected time slot:', date);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Weekly Schedule</h1>
        <button
          type="button"
          onClick={handleGenerateSchedule}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Generate Schedule
        </button>
      </div>

      <WeeklySchedule
        currentDate={currentDate}
        onPreviousWeek={handlePreviousWeek}
        onNextWeek={handleNextWeek}
        onTimeSlotClick={handleTimeSlotClick}
      />
    </div>
  );
};

export default Schedule;