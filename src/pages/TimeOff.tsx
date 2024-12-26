import React from 'react';
import TimeOffRequest from '../components/timeoff/TimeOffRequest';

const TimeOff = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Time Off Requests</h1>
      <TimeOffRequest />
    </div>
  );
};

export default TimeOff;