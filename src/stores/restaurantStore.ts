import { create } from 'zustand';
import { createRestaurantSlice } from './slices/restaurantSlice';
import { createRestaurantSettingsSlice } from './slices/restaurantSettingsSlice';
import { createMealServicesSlice } from './slices/mealServicesSlice';
import { createStaffingSlice } from './slices/staffingSlice';
import { createHolidaySlice } from './slices/holidaySlice';
import type { DailySchedule, MealServiceRequirements, Holiday } from '../types/restaurant';

export interface RestaurantState {
  settings: {
    id: string;
    name: string;
    description: string;
    schedule: DailySchedule[];
    staffingRequirements: MealServiceRequirements[];
    holidays: Holiday[];
  };
  loading: boolean;
  error: string | null;
}

export const useRestaurantStore = create<
  RestaurantState & 
  ReturnType<typeof createRestaurantSlice> &
  ReturnType<typeof createRestaurantSettingsSlice> &
  ReturnType<typeof createMealServicesSlice> &
  ReturnType<typeof createStaffingSlice> &
  ReturnType<typeof createHolidaySlice>
>()((...args) => ({
  settings: {
    id: '',
    name: 'My Restaurant',
    description: '',
    schedule: [],
    staffingRequirements: [],
    holidays: []
  },
  loading: false,
  error: null,
  ...createRestaurantSlice(...args),
  ...createRestaurantSettingsSlice(...args),
  ...createMealServicesSlice(...args),
  ...createStaffingSlice(...args),
  ...createHolidaySlice(...args)
}));