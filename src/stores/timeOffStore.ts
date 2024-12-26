import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { TimeOffRequest } from '../types';

interface TimeOffStore {
  requests: TimeOffRequest[];
  loading: boolean;
  error: string | null;
  fetchRequests: () => Promise<void>;
  submitRequest: (request: Partial<TimeOffRequest>) => Promise<void>;
  updateRequestStatus: (id: string, status: 'approved' | 'rejected') => Promise<void>;
}

export const useTimeOffStore = create<TimeOffStore>((set) => ({
  requests: [],
  loading: false,
  error: null,

  fetchRequests: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('time_off_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ requests: data });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  submitRequest: async (request) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('time_off_requests')
        .insert(request)
        .select()
        .single();

      if (error) throw error;
      set(state => ({
        requests: [data, ...state.requests]
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  updateRequestStatus: async (id, status) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('time_off_requests')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      set(state => ({
        requests: state.requests.map(r => r.id === id ? data : r)
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  }
}));