import React from 'react';

const WeeklyAvailability = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div className="space-y-4">
      {days.map((day) => (
        <div key={day} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-md">
          <div className="flex items-center font-medium">{day}</div>
          
          <div className="space-y-2">
            <label className="block text-sm text-gray-700">Available Hours</label>
            <div className="flex gap-2">
              <input
                type="time"
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <span className="flex items-center">to</span>
              <input
                type="time"
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-gray-700">Preferred Hours</label>
            <div className="flex gap-2">
              <input
                type="time"
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <span className="flex items-center">to</span>
              <input
                type="time"
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeeklyAvailability;