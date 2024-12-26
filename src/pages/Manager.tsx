import React from 'react';
import { Briefcase, Calendar, Clock } from 'lucide-react';
import PendingApprovals from '../components/manager/PendingApprovals';
import ScheduleApproval from '../components/manager/ScheduleApproval';
import StaffingOverview from '../components/manager/StaffingOverview';

const Manager = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manager Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PendingApprovals />
        <div className="lg:col-span-2">
          <ScheduleApproval />
        </div>
      </div>

      <StaffingOverview />
    </div>
  );
};

export default Manager;