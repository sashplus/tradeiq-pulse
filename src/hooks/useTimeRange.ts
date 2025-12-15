import { useState, useMemo } from 'react';
import { startOfDay, subDays, startOfYear } from 'date-fns';

export type TimeRangePreset = 'today' | '7d' | '30d' | '90d' | 'ytd' | 'all' | 'custom';

export interface TimeRange {
  preset: TimeRangePreset;
  startDate: Date | null;
  endDate: Date | null;
}

export interface TimeRangeResult {
  timeRange: TimeRange;
  setPreset: (preset: TimeRangePreset) => void;
  setCustomRange: (start: Date, end: Date) => void;
  getDateRange: () => { start: Date | null; end: Date | null };
  getLabel: () => string;
}

const PRESET_LABELS: Record<TimeRangePreset, string> = {
  today: 'Today',
  '7d': 'Last 7 days',
  '30d': 'Last 30 days',
  '90d': 'Last 90 days',
  ytd: 'Year to date',
  all: 'All time',
  custom: 'Custom range',
};

export function useTimeRange(defaultPreset: TimeRangePreset = '30d'): TimeRangeResult {
  const [timeRange, setTimeRange] = useState<TimeRange>({
    preset: defaultPreset,
    startDate: null,
    endDate: null,
  });

  const setPreset = (preset: TimeRangePreset) => {
    setTimeRange({
      preset,
      startDate: null,
      endDate: null,
    });
  };

  const setCustomRange = (start: Date, end: Date) => {
    setTimeRange({
      preset: 'custom',
      startDate: start,
      endDate: end,
    });
  };

  const getDateRange = useMemo(() => {
    return () => {
      const now = new Date();
      const today = startOfDay(now);

      switch (timeRange.preset) {
        case 'today':
          return { start: today, end: now };
        case '7d':
          return { start: subDays(today, 7), end: now };
        case '30d':
          return { start: subDays(today, 30), end: now };
        case '90d':
          return { start: subDays(today, 90), end: now };
        case 'ytd':
          return { start: startOfYear(now), end: now };
        case 'all':
          return { start: null, end: null };
        case 'custom':
          return { start: timeRange.startDate, end: timeRange.endDate };
        default:
          return { start: null, end: null };
      }
    };
  }, [timeRange]);

  const getLabel = () => {
    if (timeRange.preset === 'custom' && timeRange.startDate && timeRange.endDate) {
      return `${timeRange.startDate.toLocaleDateString()} - ${timeRange.endDate.toLocaleDateString()}`;
    }
    return PRESET_LABELS[timeRange.preset];
  };

  return {
    timeRange,
    setPreset,
    setCustomRange,
    getDateRange,
    getLabel,
  };
}
