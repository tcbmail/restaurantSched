import React from 'react';
import { format } from 'date-fns';
import { Clock, Check, X } from 'lucide-react';
import { useTimeOffStore } from '../../stores/timeOffStore';
import type { TimeOffRequest } from '../../types';

const TimeOffList = () => {
  const { requests, updateRequestStatus } = useTimeOffStore();

  const handleApprove = async (id: string) => {
    await updateRequestStatus(id, 'approved');
  };

  const handleReject = async (id: string) => {
    await updateRequestStatus(id, 'rejected');
  };

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <TimeOffRequestCard
          key={request.id}
          request={request}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      ))}
    </div>
  );
};

interface TimeOffRequestCardProps {
  request: TimeOffRequest;
  onApprove: (id: string) => Promise<void>;
  onReject: (id: string) => Promise<void>;
}

const TimeOffRequestCard = ({ request, onApprove, onReject }: TimeOffRequestCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-indigo-600" />
          <div>
            <h3 className="font-medium">{request.employeeId}</h3>
            <p className="text-sm text-gray-500">
              {format(new Date(request.created_at), 'MMM d, yyyy')}
            </p>
          </div>
        </div>
        <StatusBadge status={request.status} />
      </div>

      <div className="mb-3">
        <div className="text-sm">
          <span className="font-medium">From:</span>{' '}
          {format(new Date(request.startDate), 'MMM d, yyyy')}
        </div>
        <div className="text-sm">
          <span className="font-medium">To:</span>{' '}
          {format(new Date(request.endDate), 'MMM d, yyyy')}
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4">{request.reason}</p>

      {request.status === 'pending' && (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => onReject(request.id)}
            className="px-3 py-1 border border-red-300 text-red-600 rounded hover:bg-red-50"
          >
            <X className="h-4 w-4" />
          </button>
          <button
            onClick={() => onApprove(request.id)}
            className="px-3 py-1 border border-green-300 text-green-600 rounded hover:bg-green-50"
          >
            <Check className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

const StatusBadge = ({ status }: { status: TimeOffRequest['status'] }) => {
  const styles = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default TimeOffList;