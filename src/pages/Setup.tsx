import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Users } from 'lucide-react';

const Setup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  const [restaurantInfo, setRestaurantInfo] = useState({
    name: '',
    openingHours: Array(7).fill({ open: '09:00', close: '22:00', busyness: 50 }),
    positions: [{ name: '', requiresLead: false, minEmployees: 1, maxEmployees: 1 }]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save to Supabase
    navigate('/employees');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Restaurant Setup</h1>
        
        <div className="mb-8">
          <div className="flex items-center">
            <div className={`flex-1 border-t-2 ${step >= 1 ? 'border-indigo-500' : 'border-gray-200'}`} />
            <div className={`flex-1 border-t-2 ${step >= 2 ? 'border-indigo-500' : 'border-gray-200'}`} />
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Clock className="h-5 w-5 text-indigo-500" />
              Basic Information
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Restaurant Name</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={restaurantInfo.name}
                onChange={(e) => setRestaurantInfo({ ...restaurantInfo, name: e.target.value })}
              />
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Opening Hours</h3>
              {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => (
                <div key={day} className="grid grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center">{day}</div>
                  <input
                    type="time"
                    className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={restaurantInfo.openingHours[index].open}
                    onChange={(e) => {
                      const newHours = [...restaurantInfo.openingHours];
                      newHours[index] = { ...newHours[index], open: e.target.value };
                      setRestaurantInfo({ ...restaurantInfo, openingHours: newHours });
                    }}
                  />
                  <input
                    type="time"
                    className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={restaurantInfo.openingHours[index].close}
                    onChange={(e) => {
                      const newHours = [...restaurantInfo.openingHours];
                      newHours[index] = { ...newHours[index], close: e.target.value };
                      setRestaurantInfo({ ...restaurantInfo, openingHours: newHours });
                    }}
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    className="w-full"
                    value={restaurantInfo.openingHours[index].busyness}
                    onChange={(e) => {
                      const newHours = [...restaurantInfo.openingHours];
                      newHours[index] = { ...newHours[index], busyness: parseInt(e.target.value) };
                      setRestaurantInfo({ ...restaurantInfo, openingHours: newHours });
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                onClick={() => setStep(2)}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Users className="h-5 w-5 text-indigo-500" />
              Positions
            </h2>

            {restaurantInfo.positions.map((position, index) => (
              <div key={index} className="space-y-4 p-4 border rounded-md">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Position Name</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={position.name}
                    onChange={(e) => {
                      const newPositions = [...restaurantInfo.positions];
                      newPositions[index] = { ...newPositions[index], name: e.target.value };
                      setRestaurantInfo({ ...restaurantInfo, positions: newPositions });
                    }}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={position.requiresLead}
                      onChange={(e) => {
                        const newPositions = [...restaurantInfo.positions];
                        newPositions[index] = { ...newPositions[index], requiresLead: e.target.checked };
                        setRestaurantInfo({ ...restaurantInfo, positions: newPositions });
                      }}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    Requires Lead
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Minimum Employees</label>
                    <input
                      type="number"
                      min="1"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={position.minEmployees}
                      onChange={(e) => {
                        const newPositions = [...restaurantInfo.positions];
                        newPositions[index] = { ...newPositions[index], minEmployees: parseInt(e.target.value) };
                        setRestaurantInfo({ ...restaurantInfo, positions: newPositions });
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Maximum Employees</label>
                    <input
                      type="number"
                      min="1"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={position.maxEmployees}
                      onChange={(e) => {
                        const newPositions = [...restaurantInfo.positions];
                        newPositions[index] = { ...newPositions[index], maxEmployees: parseInt(e.target.value) };
                        setRestaurantInfo({ ...restaurantInfo, positions: newPositions });
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              className="w-full border-2 border-dashed border-gray-300 rounded-md p-4 text-gray-600 hover:border-indigo-500 hover:text-indigo-500"
              onClick={() => {
                setRestaurantInfo({
                  ...restaurantInfo,
                  positions: [
                    ...restaurantInfo.positions,
                    { name: '', requiresLead: false, minEmployees: 1, maxEmployees: 1 }
                  ]
                });
              }}
            >
              Add Position
            </button>

            <div className="flex justify-between">
              <button
                type="button"
                className="text-gray-600 px-4 py-2 rounded-md hover:bg-gray-100"
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <button
                type="button"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                onClick={handleSubmit}
              >
                Complete Setup
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Setup;