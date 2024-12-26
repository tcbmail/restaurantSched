import React from 'react';
import { Clock } from 'lucide-react';
import type { DailySchedule, ServiceHours } from '../../types/restaurant';

interface ServiceScheduleProps {
  schedule: DailySchedule;
  onUpdate: (updates: Partial<DailySchedule>) => void;
}

const ServiceSchedule = ({ schedule, onUpdate }: ServiceScheduleProps) => {
  const handleServiceUpdate = (
    service: 'breakfast' | 'lunch' | 'dinner',
    field: keyof ServiceHours,
    value: any
  ) => {
    onUpdate({
      ...schedule,
      [service]: {
        ...schedule[service],
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={schedule.isOpen}
          onChange={(e) => onUpdate({ isOpen: e.target.checked })}
          className="rounded border-gray-300 text-indigo-600"
        />
        <span className="font-medium">Open</span>
      </div>

      {schedule.isOpen && (
        <div className="space-y-6 pl-6">
          {['breakfast', 'lunch', 'dinner'].map((service) => (
            <ServiceBlock
              key={service}
              service={service as keyof DailySchedule}
              hours={schedule[service as keyof DailySchedule] as ServiceHours}
              onUpdate={(field, value) => handleServiceUpdate(service as any, field, value)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface ServiceBlockProps {
  service: keyof DailySchedule;
  hours?: ServiceHours;
  onUpdate: (field: keyof ServiceHours, value: any) => void;
}

const ServiceBlock = ({ service, hours, onUpdate }: ServiceBlockProps) => {
  if (!hours) return null;

  return (
    <div className="border rounded-md p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-medium capitalize">{service}</h4>
        <input
          type="checkbox"
          checked={hours.isActive}
          onChange={(e) => onUpdate('isActive', e.target.checked)}
          className="rounded border-gray-300 text-indigo-600"
        />
      </div>

      {hours.isActive && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600">Start Time</label>
              <input
                type="time"
                value={hours.start}
                onChange={(e) => onUpdate('start', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">End Time</label>
              <input
                type="time"
                value={hours.end}
                onChange={(e) => onUpdate('end', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600">Peak Start</label>
              <input
                type="time"
                value={hours.peakStart}
                onChange={(e) => onUpdate('peakStart', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Peak End</label>
              <input
                type="time"
                value={hours.peakEnd}
                onChange={(e) => onUpdate('peakEnd', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600">Expected Traffic</label>
            <select
              value={hours.expectedTraffic}
              onChange={(e) => onUpdate('expectedTraffic', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceSchedule;