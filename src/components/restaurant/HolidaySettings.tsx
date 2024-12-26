import React from 'react';
import { Calendar, Plus, Trash2 } from 'lucide-react';
import type { Holiday } from '../../types/restaurant';

interface HolidaySettingsProps {
  holidays: Holiday[];
  onUpdate: (holidays: Holiday[]) => void;
}

const HolidaySettings = ({ holidays, onUpdate }: HolidaySettingsProps) => {
  const handleAddHoliday = () => {
    onUpdate([
      ...holidays,
      {
        id: crypto.randomUUID(),
        name: '',
        date: '',
        status: 'closed'
      }
    ]);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Calendar className="h-5 w-5 text-indigo-600" />
          Holiday Settings
        </h2>
        <button
          onClick={handleAddHoliday}
          className="text-indigo-600 hover:text-indigo-700"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-4">
        {holidays.map((holiday, index) => (
          <div key={holiday.id} className="border rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600">Holiday Name</label>
                <input
                  type="text"
                  value={holiday.name}
                  onChange={(e) => {
                    const newHolidays = [...holidays];
                    newHolidays[index] = { ...holiday, name: e.target.value };
                    onUpdate(newHolidays);
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Date</label>
                <input
                  type="date"
                  value={holiday.date}
                  onChange={(e) => {
                    const newHolidays = [...holidays];
                    newHolidays[index] = { ...holiday, date: e.target.value };
                    onUpdate(newHolidays);
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm text-gray-600">Status</label>
              <select
                value={holiday.status}
                onChange={(e) => {
                  const newHolidays = [...holidays];
                  newHolidays[index] = {
                    ...holiday,
                    status: e.target.value as Holiday['status']
                  };
                  onUpdate(newHolidays);
                }}
                className="mt-1 block w-full rounded-md border-gray-300"
              >
                <option value="closed">Closed</option>
                <option value="limited">Limited Hours</option>
                <option value="normal">Normal Hours</option>
              </select>
            </div>

            {holiday.status === 'limited' && (
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600">Open</label>
                  <input
                    type="time"
                    value={holiday.modifiedHours?.open}
                    onChange={(e) => {
                      const newHolidays = [...holidays];
                      newHolidays[index] = {
                        ...holiday,
                        modifiedHours: {
                          ...holiday.modifiedHours,
                          open: e.target.value
                        }
                      };
                      onUpdate(newHolidays);
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Close</label>
                  <input
                    type="time"
                    value={holiday.modifiedHours?.close}
                    onChange={(e) => {
                      const newHolidays = [...holidays];
                      newHolidays[index] = {
                        ...holiday,
                        modifiedHours: {
                          ...holiday.modifiedHours,
                          close: e.target.value
                        }
                      };
                      onUpdate(newHolidays);
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300"
                  />
                </div>
              </div>
            )}

            <div className="mt-4">
              <label className="block text-sm text-gray-600">Notes</label>
              <textarea
                value={holiday.notes}
                onChange={(e) => {
                  const newHolidays = [...holidays];
                  newHolidays[index] = { ...holiday, notes: e.target.value };
                  onUpdate(newHolidays);
                }}
                className="mt-1 block w-full rounded-md border-gray-300"
                rows={2}
              />
            </div>

            <button
              onClick={() => {
                const newHolidays = holidays.filter((_, i) => i !== index);
                onUpdate(newHolidays);
              }}
              className="mt-4 text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HolidaySettings;