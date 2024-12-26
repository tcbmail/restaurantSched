import React, { useState } from 'react';
import { Users, Calendar, MessageSquare, X } from 'lucide-react';
import ChatInterface from '../components/chat/ChatInterface';
import { useEmployeeStore } from '../stores/employeeStore';
import { useTimeOffStore } from '../stores/timeOffStore';
import EmployeeList from '../components/employees/EmployeeList';
import TimeOffList from '../components/timeoff/TimeOffList';
import WeeklySchedule from '../components/schedule/WeeklySchedule';

const Dashboard = () => {
  const { employees } = useEmployeeStore();
  const { requests } = useTimeOffStore();
  const [activeModal, setActiveModal] = useState<'employees' | 'shifts' | 'timeoff' | null>(null);

  const pendingTimeOff = requests.filter(r => r.status === 'pending').length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          icon={<Users className="h-6 w-6 text-indigo-600" />}
          title="Total Employees"
          value={employees.length}
          onClick={() => setActiveModal('employees')}
        />
        <StatCard
          icon={<Calendar className="h-6 w-6 text-green-600" />}
          title="Scheduled Shifts"
          value="23"
          onClick={() => setActiveModal('shifts')}
        />
        <StatCard
          icon={<MessageSquare className="h-6 w-6 text-blue-600" />}
          title="Time Off Requests"
          value={pendingTimeOff}
          onClick={() => setActiveModal('timeoff')}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Schedule Assistant</h2>
          <ChatInterface />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Updates</h2>
          <div className="bg-white rounded-lg shadow-lg p-4">
            {/* Recent updates will go here */}
          </div>
        </div>
      </div>

      {activeModal && (
        <DetailModal
          title={getModalTitle(activeModal)}
          onClose={() => setActiveModal(null)}
        >
          {activeModal === 'employees' && <EmployeeList />}
          {activeModal === 'shifts' && <WeeklySchedule />}
          {activeModal === 'timeoff' && <TimeOffList />}
        </DetailModal>
      )}
    </div>
  );
};

const StatCard = ({ 
  icon, 
  title, 
  value, 
  onClick 
}: { 
  icon: React.ReactNode; 
  title: string; 
  value: string | number;
  onClick: () => void;
}) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        {icon}
        <div>
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
};

const DetailModal = ({ 
  title, 
  children, 
  onClose 
}: { 
  title: string; 
  children: React.ReactNode; 
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4 overflow-y-auto max-h-[calc(90vh-80px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

const getModalTitle = (modal: 'employees' | 'shifts' | 'timeoff') => {
  switch (modal) {
    case 'employees':
      return 'Employee List';
    case 'shifts':
      return 'Scheduled Shifts';
    case 'timeoff':
      return 'Time Off Requests';
  }
};

export default Dashboard;