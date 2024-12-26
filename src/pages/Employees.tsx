import React from 'react';
import { Plus } from 'lucide-react';
import EmployeeForm from '../components/employees/EmployeeForm';

const Employees = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Employees</h1>
        <button
          type="button"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5" />
          Add Employee
        </button>
      </div>

      <EmployeeForm
        employee={{}}
        onSubmit={(data) => {
          console.log('Employee data:', data);
          // TODO: Save to Supabase
        }}
      />
    </div>
  );
};

export default Employees;