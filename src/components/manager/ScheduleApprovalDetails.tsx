import React from 'react';
import { Calendar, AlertTriangle, Check, X } from 'lucide-react';
import { format } from 'date-fns';
import type { Schedule } from '../../types';

interface ScheduleApprovalDetailsProps {
  schedule: Schedule;
  onApprove: () => void;
  onReject: () => void;
}

const ScheduleApprovalDetails = ({
  schedule,
  onApprove,
  onReject
}: ScheduleApprovalDetailsProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-indigo-600" />
          <h2 className="text-lg font-semibold">
            Schedule for {format(new Date(schedule.date), 'MMMM d, yyyy')}
          </h2>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={onReject}
            className="px-4 py-2 text-red-600 border border-red-300 rounded-md hover:bg-red-50"
          >
            <div className="flex items-center gap-2">
              <X className="h-4 w-4" />
              Reject
            </div>
          </button>
          <button
            onClick={onApprove}
            className="px-4 py-2 text-green-600 border border-green-300 rounded-md hover:bg-green-50"
          >
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              Approve
            </div>
          </button>
        </div>
      </div>

      {/* Add schedule visualization here */}
    </div>
  );
};

export default ScheduleApprovalDetails;