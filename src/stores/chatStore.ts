import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  metadata?: Record<string, any>;
}

interface ChatStore {
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
  sendMessage: (text: string) => Promise<void>;
  fetchMessages: () => Promise<void>;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  loading: false,
  error: null,

  sendMessage: async (text: string) => {
    set({ loading: true, error: null });
    try {
      // TODO: Integrate with OpenAI for processing
      const message: ChatMessage = {
        id: crypto.randomUUID(),
        text,
        sender: 'user',
        timestamp: new Date(),
      };

      const { error } = await supabase
        .from('chat_messages')
        .insert(message);

      if (error) throw error;

      set(state => ({
        messages: [...state.messages, message]
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  fetchMessages: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .order('timestamp', { ascending: true });

      if (error) throw error;
      set({ messages: data });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },
}));