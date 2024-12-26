import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { generateSchedule } from '../lib/openai';

interface Schedule {
  id: string;
  employeeId: string;
  date: string;
  startTime: string;
  endTime: string;
  position: string;
  isLead: boolean;
  status: 'pending' | 'approved' | 'rejected';
}

interface ScheduleStore {
  schedules: Schedule[];
  loading: boolean;
  error: string | null;
  fetchSchedule: (startDate: string, endDate: string) => Promise<void>;
  generateSchedule: (startDate: string, endDate: string) => Promise<void>;
  approveShiftTrade: (shiftId: string, newEmployeeId: string) => Promise<void>;
}

export const useScheduleStore = create<ScheduleStore>((set) => ({
  schedules: [],
  loading: false,
  error: null,

  fetchSchedule: async (startDate, endDate) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('schedules')
        .select('*')
        .gte('date', startDate)
        .lte('date', endDate);

      if (error) throw error;
      set({ schedules: data });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  generateSchedule: async (startDate, endDate) => {
    set({ loading: true, error: null });
    try {
      const { data: employees } = await supabase.from('employees').select('*');
      const { data: positions } = await supabase.from('positions').select('*');

      const schedule = await generateSchedule(
        employees || [],
        positions || [],
        startDate,
        endDate
      );

      const { error } = await supabase.from('schedules').insert(schedule);
      if (error) throw error;

      set(state => ({
        schedules: [...state.schedules, ...schedule]
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  approveShiftTrade: async (shiftId, newEmployeeId) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('schedules')
        .update({ employeeId: newEmployeeId })
        .eq('id', shiftId);

      if (error) throw error;

      set(state => ({
        schedules: state.schedules.map(s =>
          s.id === shiftId ? { ...s, employeeId: newEmployeeId } : s
        )
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  }
}));