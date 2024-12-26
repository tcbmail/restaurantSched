import { StateCreator } from 'zustand';
import { supabase } from '../../lib/supabase';
import { handleSupabaseError } from '../../utils/errorHandling';
import type { RestaurantState } from '../restaurantStore';
import type { Holiday } from '../../types/restaurant';

export interface HolidaySlice {
  updateHolidays: (holidays: Holiday[]) => Promise<void>;
  fetchHolidays: (restaurantId: string) => Promise<Holiday[]>;
}

export const createHolidaySlice: StateCreator<
  RestaurantState,
  [],
  [],
  HolidaySlice
> = (set, get) => ({
  updateHolidays: async (holidays) => {
    const { id } = get().settings;
    if (!id) return;

    try {
      const { error } = await supabase
        .from('holidays')
        .upsert(
          holidays.map(holiday => ({
            ...holiday,
            restaurant_id: id
          }))
        );

      if (error) throw error;

      set(state => ({
        settings: { ...state.settings, holidays }
      }));
    } catch (error) {
      set({ error: handleSupabaseError(error) });
    }
  },

  fetchHolidays: async (restaurantId) => {
    const { data, error } = await supabase
      .from('holidays')
      .select('*')
      .eq('restaurant_id', restaurantId);

    if (error) throw error;
    return data || [];
  }
});