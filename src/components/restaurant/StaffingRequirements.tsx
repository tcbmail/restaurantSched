import React from 'react';
import { Users } from 'lucide-react';
import StaffingLevels from './StaffingLevels';
import type { MealServiceRequirements } from '../../types/restaurant';

interface StaffingRequirementsProps {
  requirements: MealServiceRequirements[];
  onUpdate: (requirements: MealServiceRequirements[]) => void;
}

const StaffingRequirements = ({ requirements, onUpdate }: StaffingRequirementsProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Users className="h-5 w-5 text-indigo-600" />
        <h2 className="text-xl font-semibold">Staffing Requirements</h2>
      </div>

      <div className="space-y-8">
        {['breakfast', 'lunch', 'dinner'].map((service) => {
          const serviceReqs = requirements.find(r => r.service === service);
          return (
            <StaffingLevels
              key={service}
              serviceName={service}
              levels={serviceReqs?.requirements || []}
              onUpdate={(levels) => {
                const newReqs = [...requirements];
                const index = newReqs.findIndex(r => r.service === service);
                if (index >= 0) {
                  newReqs[index] = { ...newReqs[index], requirements: levels };
                } else {
                  newReqs.push({ service: service as any, requirements: levels });
                }
                onUpdate(newReqs);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default StaffingRequirements;