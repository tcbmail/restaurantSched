import React from 'react';
import { Clock, Calendar, AlertCircle } from 'lucide-react';
import { useTimeOffStore } from '../../stores/timeOffStore';
import { format } from 'date-fns';

const PendingApprovals = () => {
  const { requests } = useTimeOffStore();
  const pendingRequests = requests.filter(req => req.status === 'pending');

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Pending Approvals</h2>
      
      <div className="space-y-4">
        {pendingRequests.map((request) => (
          <div key={request.id} className="border-b pb-3">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-indigo-600" />
              <span className="font-medium">{request.employeeId}</span>
            </div>
            <div className="text-sm text-gray-600">
              {format(new Date(request.startDate), 'MMM d')} -{' '}
              {format(new Date(request.endDate), 'MMM d, yyyy')}
            </div>
            <div className="text-sm text-gray-500 mt-1">{request.reason}</div>
          </div>
        ))}

        {pendingRequests.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            <AlertCircle className="h-5 w-5 mx-auto mb-2" />
            No pending approvals
          </div>
        )}
      </div>
    </div>
  );
}

export default PendingApprovals;