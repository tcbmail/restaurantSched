import React from 'react';
import { Users, Plus, Trash2 } from 'lucide-react';
import type { StaffingLevel, TrafficLevel } from '../../types/restaurant';

interface StaffingLevelsProps {
  serviceName: string;
  levels: StaffingLevel[];
  onUpdate: (levels: StaffingLevel[]) => void;
}

const StaffingLevels = ({ serviceName, levels, onUpdate }: StaffingLevelsProps) => {
  const handleAddPosition = () => {
    onUpdate([
      ...levels,
      {
        position: '',
        trafficLevel: 'medium',
        minStaff: 1,
        optimalStaff: 2,
        maxStaff: 3
      }
    ]);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium capitalize">{serviceName}</h3>
        <button
          onClick={handleAddPosition}
          className="text-indigo-600 hover:text-indigo-700"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-4">
        {levels.map((level, index) => (
          <StaffingLevelRow
            key={index}
            level={level}
            onUpdate={(updated) => {
              const newLevels = [...levels];
              newLevels[index] = updated;
              onUpdate(newLevels);
            }}
            onDelete={() => {
              const newLevels = levels.filter((_, i) => i !== index);
              onUpdate(newLevels);
            }}
          />
        ))}
      </div>
    </div>
  );
};

interface StaffingLevelRowProps {
  level: StaffingLevel;
  onUpdate: (level: StaffingLevel) => void;
  onDelete: () => void;
}

const StaffingLevelRow = ({ level, onUpdate, onDelete }: StaffingLevelRowProps) => {
  return (
    <div className="grid grid-cols-5 gap-4 items-end">
      <div>
        <label className="block text-sm text-gray-600">Position</label>
        <input
          type="text"
          value={level.position}
          onChange={(e) => onUpdate({ ...level, position: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600">Traffic Level</label>
        <select
          value={level.trafficLevel}
          onChange={(e) => onUpdate({ ...level, trafficLevel: e.target.value as TrafficLevel })}
          className="mt-1 block w-full rounded-md border-gray-300"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div>
        <label className="block text-sm text-gray-600">Min Staff</label>
        <input
          type="number"
          min="0"
          value={level.minStaff}
          onChange={(e) => onUpdate({ ...level, minStaff: parseInt(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600">Optimal Staff</label>
        <input
          type="number"
          min={level.minStaff}
          value={level.optimalStaff}
          onChange={(e) => onUpdate({ ...level, optimalStaff: parseInt(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600">Max Staff</label>
        <input
          type="number"
          min={level.optimalStaff}
          value={level.maxStaff}
          onChange={(e) => onUpdate({ ...level, maxStaff: parseInt(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300"
        />
      </div>

      <button
        onClick={onDelete}
        className="text-red-600 hover:text-red-700"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  );
};

export default StaffingLevels;