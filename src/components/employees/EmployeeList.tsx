import React from 'react';
import { useEmployeeStore } from '../../stores/employeeStore';
import { User, DollarSign, Clock } from 'lucide-react';
import type { Employee } from '../../types';

const EmployeeList = () => {
  const { employees, loading } = useEmployeeStore();

  if (loading) {
    return <div className="text-center py-4">Loading employees...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {employees.map((employee) => (
        <EmployeeCard key={employee.id} employee={employee} />
      ))}
    </div>
  );
};

const EmployeeCard = ({ employee }: { employee: Employee }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="bg-indigo-100 p-2 rounded-full">
          <User className="h-5 w-5 text-indigo-600" />
        </div>
        <div>
          <h3 className="font-medium">{employee.name}</h3>
          <p className="text-sm text-gray-500">{employee.position}</p>
        </div>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-gray-400" />
          <span>${employee.hourlyRate}/hr</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-400" />
          <span>{employee.isFullTime ? 'Full Time' : 'Part Time'}</span>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1">
        {employee.capabilities.map((capability) => (
          <span 
            key={capability} 
            className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
          >
            {capability}
          </span>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;