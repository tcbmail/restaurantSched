import { StateCreator } from 'zustand';
import { supabase } from '../../lib/supabase';
import type { RestaurantState } from '../restaurantStore';
import type { DailySchedule, ServiceHours } from '../../types/restaurant';

export interface MealServicesSlice {
  updateSchedule: (dayIndex: number, updates: Partial<DailySchedule>) => Promise<void>;
  fetchMealServices: (restaurantId: string) => Promise<any[]>;
}

const transformServiceHours = (hours: ServiceHours) => ({
  is_active: hours.isActive,
  start_time: hours.start,
  end_time: hours.end,
  peak_start: hours.peakStart,
  peak_end: hours.peakEnd,
  expected_traffic: hours.expectedTraffic
});

export const createMealServicesSlice: StateCreator<
  RestaurantState,
  [],
  [],
  MealServicesSlice
> = (set, get) => ({
  updateSchedule: async (dayIndex, updates) => {
    const { id } = get().settings;
    if (!id) return;

    const newSchedule = [...get().settings.schedule];
    newSchedule[dayIndex] = { ...newSchedule[dayIndex], ...updates };

    try {
      const { error } = await supabase
        .from('meal_services')
        .upsert(
          Object.entries(updates)
            .filter(([key]) => ['breakfast', 'lunch', 'dinner'].includes(key))
            .map(([service, hours]) => ({
              restaurant_id: id,
              service_type: service,
              ...transformServiceHours(hours as ServiceHours)
            }))
        );

      if (error) throw error;

      set(state => ({
        settings: { ...state.settings, schedule: newSchedule }
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  fetchMealServices: async (restaurantId: string) => {
    const { data, error } = await supabase
      .from('meal_services')
      .select('*')
      .eq('restaurant_id', restaurantId);

    if (error) throw error;
    return data || [];
  }
});