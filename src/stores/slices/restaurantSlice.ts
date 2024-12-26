import { StateCreator } from 'zustand';
import { supabase } from '../../lib/supabase';
import type { RestaurantState } from '../restaurantStore';
import { transformServicesToSchedule } from '../utils/transformers';

export interface RestaurantSlice {
  fetchSettings: () => Promise<void>;
}

export const createRestaurantSlice: StateCreator<
  RestaurantState,
  [],
  [],
  RestaurantSlice
> = (set) => ({
  fetchSettings: async () => {
    set({ loading: true, error: null });
    try {
      // First, ensure we have a restaurant
      const { data: existingSettings } = await supabase
        .from('restaurant_settings')
        .select('*')
        .limit(1)
        .single();

      // If no settings exist, create default
      if (!existingSettings) {
        const { data: newSettings, error: createError } = await supabase
          .from('restaurant_settings')
          .insert({ 
            name: 'My Restaurant',
            description: 'A great place to eat'
          })
          .select()
          .single();

        if (createError) throw createError;
        
        // Use the newly created settings
        set({ settings: { ...newSettings, schedule: [], staffingRequirements: [], holidays: [] } });
        return;
      }

      // Get all related data
      const [
        { data: services },
        { data: requirements },
        { data: holidays }
      ] = await Promise.all([
        supabase
          .from('meal_services')
          .select('*')
          .eq('restaurant_id', existingSettings.id),
        supabase
          .from('staffing_requirements')
          .select('*, service:meal_services(service_type), position:positions(name)')
          .eq('service:meal_services.restaurant_id', existingSettings.id),
        supabase
          .from('holidays')
          .select('*')
          .eq('restaurant_id', existingSettings.id)
      ]);

      set({
        settings: {
          ...existingSettings,
          schedule: services ? transformServicesToSchedule(services) : [],
          staffingRequirements: requirements || [],
          holidays: holidays || []
        },
        loading: false
      });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
      console.error('Error fetching restaurant settings:', error);
    }
  }
});