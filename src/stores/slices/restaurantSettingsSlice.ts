import { StateCreator } from 'zustand';
import { supabase } from '../../lib/supabase';
import type { RestaurantState } from '../restaurantStore';

export interface RestaurantSettingsSlice {
  updateSettings: (updates: { name?: string; description?: string }) => Promise<void>;
  createDefaultSettings: () => Promise<{ id: string; name: string; description: string }>;
}

export const createRestaurantSettingsSlice: StateCreator<
  RestaurantState,
  [],
  [],
  RestaurantSettingsSlice
> = (set, get) => ({
  updateSettings: async (updates) => {
    const { id } = get().settings;
    if (!id) return;

    try {
      const { error } = await supabase
        .from('restaurant_settings')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      set(state => ({
        settings: { ...state.settings, ...updates }
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  createDefaultSettings: async () => {
    const { data, error } = await supabase
      .from('restaurant_settings')
      .insert({
        name: 'My Restaurant',
        description: 'A great place to eat'
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
});