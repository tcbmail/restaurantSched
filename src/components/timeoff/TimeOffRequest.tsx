import React, { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';

const TimeOffRequest = () => {
  const [request, setRequest] = useState({
    startDate: '',
    endDate: '',
    reason: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Submit to Supabase
    console.log('Time off request:', request);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-indigo-500" />
        Request Time Off
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <div className="mt-1 relative">
              <input
                type="date"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={request.startDate}
                onChange={(e) => setRequest({ ...request, startDate: e.target.value })}
                required
              />
              <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <div className="mt-1 relative">
              <input
                type="date"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={request.endDate}
                onChange={(e) => setRequest({ ...request, endDate: e.target.value })}
                required
              />
              <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Reason</label>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
            value={request.reason}
            onChange={(e) => setRequest({ ...request, reason: e.target.value })}
            placeholder="Please provide a reason for your time off request"
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default TimeOffRequest;