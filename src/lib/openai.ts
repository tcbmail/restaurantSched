import { supabase } from './supabase';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export const generateSchedule = async (
  employees: any[],
  positions: any[],
  startDate: string,
  endDate: string
) => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('No session found');

    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a scheduling assistant that creates optimal work schedules.'
          },
          {
            role: 'user',
            content: JSON.stringify({
              employees,
              positions,
              startDate,
              endDate,
              task: 'Generate an optimal schedule considering employee preferences, capabilities, and business needs.'
            })
          }
        ],
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error('Failed to generate schedule');
    }

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  } catch (error) {
    console.error('Schedule generation error:', error);
    throw error;
  }
};