import type { DailySchedule } from '../../types/restaurant';

export const transformServicesToSchedule = (services: any[]): DailySchedule[] => {
  const defaultSchedule: DailySchedule[] = Array.from({ length: 7 }, (_, i) => ({
    day: i,
    isOpen: true,
    breakfast: {
      isActive: true,
      start: '07:00',
      end: '11:00',
      expectedTraffic: 'medium'
    },
    lunch: {
      isActive: true,
      start: '11:00',
      end: '16:00',
      expectedTraffic: 'medium'
    },
    dinner: {
      isActive: true,
      start: '16:00',
      end: '22:00',
      expectedTraffic: 'medium'
    }
  }));

  services.forEach(service => {
    const serviceType = service.service_type;
    if (['breakfast', 'lunch', 'dinner'].includes(serviceType)) {
      defaultSchedule.forEach(day => {
        if (day[serviceType]) {
          day[serviceType] = {
            isActive: service.is_active,
            start: service.start_time,
            end: service.end_time,
            peakStart: service.peak_start,
            peakEnd: service.peak_end,
            expectedTraffic: service.expected_traffic
          };
        }
      });
    }
  });

  return defaultSchedule;
};