import React, { useEffect } from 'react';
import { Building2 } from 'lucide-react';
import RestaurantSettings from '../components/restaurant/RestaurantSettings';
import { useRestaurantStore } from '../stores/restaurantStore';

const Restaurant = () => {
  const { loading, error, fetchSettings } = useRestaurantStore();

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading restaurant settings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <p>Error loading restaurant settings: {error}</p>
          <button
            onClick={() => fetchSettings()}
            className="mt-2 text-sm underline hover:no-underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center gap-2 mb-6">
        <Building2 className="h-6 w-6 text-indigo-600" />
        <h1 className="text-2xl font-bold">Restaurant Settings</h1>
      </div>
      <RestaurantSettings />
    </div>
  );
};

export default Restaurant;