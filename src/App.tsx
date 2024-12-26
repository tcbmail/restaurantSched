import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Setup from './pages/Setup';
import Dashboard from './pages/Dashboard';
import Restaurant from './pages/Restaurant';
import Employees from './pages/Employees';
import Schedule from './pages/Schedule';
import TimeOff from './pages/TimeOff';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/setup" element={<Setup />} />
            <Route path="/restaurant" element={<Restaurant />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/time-off" element={<TimeOff />} />
          </Routes>
        </main>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;