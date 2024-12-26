import React from 'react';
import { Clock, DollarSign, Calendar } from 'lucide-react';
import { Employee } from '../../types';

interface EmployeeStatsProps {
  employee: Employee;
  weeklyHours: number;
  monthlyHours: number;
}

const EmployeeStats = ({ employee, weeklyHours, monthlyHours }: EmployeeStatsProps) => {
  const weeklyPay = weeklyHours * employee.hourlyRate;
  const monthlyPay = monthlyHours * employee.hourlyRate;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard
        icon={<Clock className="h-5 w-5 text-indigo-600" />}
        title="Weekly Hours"
        value={`${weeklyHours}h`}
        subtitle={`$${weeklyPay.toFixed(2)}`}
      />
      <StatCard
        icon={<Calendar className="h-5 w-5 text-green-600" />}
        title="Monthly Hours"
        value={`${monthlyHours}h`}
        subtitle={`$${monthlyPay.toFixed(2)}`}
      />
      <StatCard
        icon={<DollarSign className="h-5 w-5 text-blue-600" />}
        title="Hourly Rate"
        value={`$${employee.hourlyRate}`}
        subtitle={employee.isFullTime ? 'Full Time' : 'Part Time'}
      />
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
}

const StatCard = ({ icon, title, value, subtitle }: StatCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <h3 className="font-medium">{title}</h3>
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  );
};

export default EmployeeStats;