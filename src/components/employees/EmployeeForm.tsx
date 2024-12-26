import React, { useState } from 'react';
import { Clock, DollarSign, Briefcase } from 'lucide-react';
import WeeklyAvailability from './WeeklyAvailability';
import CapabilitiesSelect from './CapabilitiesSelect';
import EmployeeHours from './EmployeeHours';
import Certifications from './Certifications';
import { Employee } from '../../types';

type EmployeeFormProps = {
  employee: Partial<Employee>;
  onSubmit: (data: Partial<Employee>) => void;
};

const EmployeeForm = ({ employee, onSubmit }: EmployeeFormProps) => {
  const [formData, setFormData] = useState<Partial<Employee>>({
    ...employee,
    isFullTime: employee.isFullTime || false,
    desiredHours: employee.desiredHours || 20,
    certifications: employee.certifications || {}
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
          <Briefcase className="h-5 w-5 text-indigo-500" />
          Basic Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.email || ''}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Position</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.position || ''}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              required
            >
              <option value="">Select a position...</option>
              {/* Positions will be populated from the store */}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <span className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                Hourly Rate
              </span>
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.hourlyRate || ''}
              onChange={(e) => setFormData({ ...formData, hourlyRate: parseFloat(e.target.value) })}
              required
            />
          </div>
        </div>
      </div>

      <EmployeeHours
        isFullTime={formData.isFullTime || false}
        desiredHours={formData.desiredHours || 20}
        onUpdate={(hours) => setFormData({ ...formData, ...hours })}
      />

      <div className="bg-white shadow-sm rounded-lg p-6">
        <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
          <Clock className="h-5 w-5 text-indigo-500" />
          Availability & Preferences
        </h3>
        <WeeklyAvailability />
      </div>

      <Certifications
        certifications={formData.certifications || {}}
        onChange={(certifications) => setFormData({ ...formData, certifications })}
      />

      <div className="bg-white shadow-sm rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Capabilities & Notes</h3>
        <CapabilitiesSelect />
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
          <textarea
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter any additional notes about the employee"
            value={formData.notes || ''}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Save Employee
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;