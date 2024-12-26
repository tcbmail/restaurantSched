import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface ManagerStore {
  pendingSchedules: any[];
  loading: boolean;
  error: string | null;
  approveSchedule: (scheduleId: string) => Promise<void>;
  rejectSchedule: (scheduleId: string, reason: string) => Promise<void>;
  fetchPendingSchedules: () => Promise<void>;
}

export const useManagerStore = create<ManagerStore>((set) => ({
  pendingSchedules: [],
  loading: false,
  error: null,

  approveSchedule: async (scheduleId: string) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('schedules')
        .update({ status: 'approved', approved_at: new Date().toISOString() })
        .eq('id', scheduleId);

      if (error) throw error;
      
      set(state => ({
        pendingSchedules: state.pendingSchedules.filter(s => s.id !== scheduleId)
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  rejectSchedule: async (scheduleId: string, reason: string) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('schedules')
        .update({ 
          status: 'rejected',
          rejected_at: new Date().toISOString(),
          rejection_reason: reason
        })
        .eq('id', scheduleId);

      if (error) throw error;
      
      set(state => ({
        pendingSchedules: state.pendingSchedules.filter(s => s.id !== scheduleId)
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  fetchPendingSchedules: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('schedules')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ pendingSchedules: data });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },
}));