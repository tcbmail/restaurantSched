import { useEffect } from 'react';
import { useRestaurantStore } from '../stores/restaurantStore';

export const useRestaurantSetup = () => {
  const { fetchSettings, loading, error } = useRestaurantStore();

  useEffect(() => {
    const initializeRestaurant = async () => {
      try {
        await fetchSettings();
      } catch (error) {
        console.error('Failed to initialize restaurant:', error);
      }
    };

    initializeRestaurant();
  }, [fetchSettings]);

  return { loading, error };
};