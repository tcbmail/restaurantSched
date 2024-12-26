export type Employee = {
  id: string;
  name: string;
  email: string;
  position: string;
  hourlyRate: number;
  isFullTime: boolean;
  desiredHours?: number;
  isLead: boolean;
  notes?: string;
  certifications?: {
    foodSafety?: {
      certified: boolean;
      expirationDate?: string;
      certificationNumber?: string;
    };
  };
  availableHours: AvailableHours[];
  capabilities: string[];
  preferredHours: PreferredHours[];
  created_at: string;
};