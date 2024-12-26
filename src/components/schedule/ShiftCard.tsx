import React from 'react';
import { User } from 'lucide-react';

interface ShiftCardProps {
  employeeName: string;
  position: string;
  startTime: string;
  endTime: string;
  isLead?: boolean;
}

const ShiftCard = ({ employeeName, position, startTime, endTime, isLead }: ShiftCardProps) => {
  return (
    <div className="absolute inset-x-0 mx-1 rounded bg-indigo-100 border border-indigo-200 p-2 text-xs">
      <div className="flex items-center gap-1">
        <User className="h-3 w-3" />
        <span className="font-medium">{employeeName}</span>
        {isLead && (
          <span className="px-1 py-0.5 text-[10px] bg-indigo-200 rounded">Lead</span>
        )}
      </div>
      <div className="text-gray-600">{position}</div>
      <div className="text-gray-500">
        {startTime} - {endTime}
      </div>
    </div>
  );
};

export default ShiftCard;