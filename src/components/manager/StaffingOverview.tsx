import React from 'react';
import { Users, DollarSign, TrendingUp } from 'lucide-react';
import { useEmployeeStore } from '../../stores/employeeStore';

const StaffingOverview = () => {
  const { employees } = useEmployeeStore();

  const stats = {
    totalEmployees: employees.length,
    fullTime: employees.filter(e => e.isFullTime).length,
    partTime: employees.filter(e => !e.isFullTime).length,
    averageHourlyRate: employees.reduce((acc, emp) => acc + emp.hourlyRate, 0) / employees.length,
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Staffing Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StaffingStat
          icon={<Users className="h-5 w-5 text-indigo-600" />}
          label="Total Staff"
          value={`${stats.totalEmployees}`}
          detail={`${stats.fullTime} Full-time · ${stats.partTime} Part-time`}
        />
        
        <StaffingStat
          icon={<DollarSign className="h-5 w-5 text-green-600" />}
          label="Average Rate"
          value={`$${stats.averageHourlyRate.toFixed(2)}`}
          detail="Per Hour"
        />
        
        <StaffingStat
          icon={<TrendingUp className="h-5 w-5 text-blue-600" />}
          label="Weekly Hours"
          value="168"
          detail="Scheduled This Week"
        />
      </div>
    </div>
  );
};

interface StaffingStatProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
}

const StaffingStat = ({ icon, label, value, detail }: StaffingStatProps) => (
  <div className="flex items-center gap-4">
    <div className="bg-gray-50 p-3 rounded-lg">{icon}</div>
    <div>
      <div className="text-sm text-gray-600">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-gray-500">{detail}</div>
    </div>
  </div>
);

export default StaffingOverview;