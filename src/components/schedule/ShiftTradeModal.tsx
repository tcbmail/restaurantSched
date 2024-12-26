import React, { useState } from 'react';
import { useEmployeeStore } from '../../stores/employeeStore';
import { Repeat, X } from 'lucide-react';

interface ShiftTradeModalProps {
  shiftId: string;
  currentEmployeeId: string;
  onClose: () => void;
  onConfirm: (newEmployeeId: string) => Promise<void>;
}

const ShiftTradeModal = ({ shiftId, currentEmployeeId, onClose, onConfirm }: ShiftTradeModalProps) => {
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const { employees } = useEmployeeStore();

  const eligibleEmployees = employees.filter(
    (emp) => emp.id !== currentEmployeeId && emp.capabilities.length > 0
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Trade Shift</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Employee
            </label>
            <select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Choose an employee...</option>
              {eligibleEmployees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={() => selectedEmployee && onConfirm(selectedEmployee)}
              disabled={!selectedEmployee}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              <div className="flex items-center gap-2">
                <Repeat className="h-4 w-4" />
                Confirm Trade
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShiftTradeModal;