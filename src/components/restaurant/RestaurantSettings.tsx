import React, { useEffect } from 'react';
import { Building2 } from 'lucide-react';
import ServiceSchedule from './ServiceSchedule';
import StaffingRequirements from './StaffingRequirements';
import HolidaySettings from './HolidaySettings';
import { useRestaurantStore } from '../../stores/restaurantStore';

const RestaurantSettings = () => {
  const { settings, updateSettings, updateSchedule, updateStaffingRequirements, updateHolidays, fetchSettings } = useRestaurantStore();

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <Building2 className="h-5 w-5 text-indigo-600" />
          Basic Information
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Restaurant Name</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={settings.name}
              onChange={(e) => updateSettings({ name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows={3}
              value={settings.description}
              onChange={(e) => updateSettings({ description: e.target.value })}
            />
          </div>
        </div>
      </div>

      {settings.schedule.map((daySchedule, index) => (
        <div key={index} className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-medium mb-4">
            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][daySchedule.day]}
          </h3>
          <ServiceSchedule
            schedule={daySchedule}
            onUpdate={(updates) => updateSchedule(index, updates)}
          />
        </div>
      ))}

      <StaffingRequirements
        requirements={settings.staffingRequirements}
        onUpdate={updateStaffingRequirements}
      />

      <HolidaySettings
        holidays={settings.holidays}
        onUpdate={updateHolidays}
      />
    </div>
  );
};

export default RestaurantSettings;