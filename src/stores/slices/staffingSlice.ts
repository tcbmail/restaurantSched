import { StateCreator } from 'zustand';
import { supabase } from '../../lib/supabase';
import { handleSupabaseError } from '../../utils/errorHandling';
import type { RestaurantState } from '../restaurantStore';
import type { MealServiceRequirements } from '../../types/restaurant';

export interface StaffingSlice {
  updateStaffingRequirements: (requirements: MealServiceRequirements[]) => Promise<void>;
  fetchStaffingRequirements: (restaurantId: string) => Promise<any[]>;
}

export const createStaffingSlice: StateCreator<
  RestaurantState,
  [],
  [],
  StaffingSlice
> = (set, get) => ({
  updateStaffingRequirements: async (requirements) => {
    const { id } = get().settings;
    if (!id) return;

    try {
      const { error } = await supabase
        .from('staffing_levels')
        .upsert(
          requirements.flatMap(req => 
            req.requirements.map(level => ({
              service_id: req.service,
              position_id: level.position,
              traffic_level: level.trafficLevel,
              min_staff: level.minStaff,
              optimal_staff: level.optimalStaff,
              max_staff: level.maxStaff
            }))
          )
        );

      if (error) throw error;

      set(state => ({
        settings: { ...state.settings, staffingRequirements: requirements }
      }));
    } catch (error) {
      set({ error: handleSupabaseError(error) });
    }
  },

  fetchStaffingRequirements: async (restaurantId) => {
    const { data, error } = await supabase
      .from('staffing_levels')
      .select(`
        *,
        service:meal_services(service_type),
        position:positions(name)
      `)
      .eq('service:meal_services.restaurant_id', restaurantId);

    if (error) throw error;
    return data || [];
  }
});