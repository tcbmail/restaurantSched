export type MealService = 'breakfast' | 'lunch' | 'dinner';
export type TrafficLevel = 'low' | 'medium' | 'high';

export type ServiceHours = {
  isActive: boolean;
  start: string;
  end: string;
  peakStart?: string;
  peakEnd?: string;
  expectedTraffic: TrafficLevel;
};

export type DailySchedule = {
  day: number;
  isOpen: boolean;
  breakfast?: ServiceHours;
  lunch?: ServiceHours;
  dinner?: ServiceHours;
};

export type StaffingLevel = {
  position: string;
  trafficLevel: TrafficLevel;
  minStaff: number;
  optimalStaff: number;
  maxStaff: number;
};

export type MealServiceRequirements = {
  service: MealService;
  requirements: StaffingLevel[];
};

export type Holiday = {
  id: string;
  name: string;
  date: string;
  status: 'closed' | 'limited' | 'normal';
  modifiedHours?: {
    open: string;
    close: string;
  };
  notes?: string;
};