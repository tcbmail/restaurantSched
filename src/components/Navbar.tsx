import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Users, Clock, Home, Building2 } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Calendar className="h-6 w-6 text-indigo-600" />
            <span className="font-bold text-xl">AI Scheduler</span>
          </Link>
          
          <div className="flex space-x-4">
            <NavLink to="/" icon={<Home />} text="Dashboard" active={isActive('/')} />
            <NavLink to="/restaurant" icon={<Building2 />} text="Restaurant" active={isActive('/restaurant')} />
            <NavLink to="/employees" icon={<Users />} text="Employees" active={isActive('/employees')} />
            <NavLink to="/schedule" icon={<Calendar />} text="Schedule" active={isActive('/schedule')} />
            <NavLink to="/time-off" icon={<Clock />} text="Time Off" active={isActive('/time-off')} />
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, icon, text, active }: { to: string; icon: React.ReactNode; text: string; active: boolean }) => (
  <Link
    to={to}
    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
      active
        ? 'bg-indigo-100 text-indigo-700'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`}
  >
    {icon}
    <span>{text}</span>
  </Link>
);

export default Navbar;