import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Employee } from '../types';

interface EmployeeStore {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  fetchEmployees: () => Promise<void>;
  addEmployee: (employee: Partial<Employee>) => Promise<void>;
  updateEmployee: (id: string, employee: Partial<Employee>) => Promise<void>;
  deleteEmployee: (id: string) => Promise<void>;
}

export const useEmployeeStore = create<EmployeeStore>((set, get) => ({
  employees: [],
  loading: false,
  error: null,

  fetchEmployees: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('employees')
        .select('*');
      
      if (error) throw error;
      set({ employees: data });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  addEmployee: async (employee) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('employees')
        .insert(employee)
        .select()
        .single();
      
      if (error) throw error;
      set(state => ({
        employees: [...state.employees, data]
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  updateEmployee: async (id, employee) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('employees')
        .update(employee)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      set(state => ({
        employees: state.employees.map(e => e.id === id ? data : e)
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  deleteEmployee: async (id) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('employees')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      set(state => ({
        employees: state.employees.filter(e => e.id !== id)
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },
}));