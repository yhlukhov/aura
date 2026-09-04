import { EventItem } from '@/types/event';

export const UKRAINIAN_MONTHS = [
  'січня', 'лютого', 'березня', 'квітня', 'травня', 'червня',
  'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'
];

export const UKRAINIAN_MONTHS_MAP: Record<string, number> = {
  'січня': 0, 'січень': 0,
  'лютого': 1, 'лютий': 1,
  'березня': 2, 'березень': 2,
  'квітня': 3, 'квітень': 3,
  'травня': 4, 'травень': 4,
  'червня': 5, 'червень': 5,
  'липня': 6, 'липень': 6,
  'серпня': 7, 'серпень': 7,
  'вересня': 8, 'вересень': 8,
  'жовтня': 9, 'жовтень': 9,
  'листопада': 10, 'листопад': 10,
  'грудня': 11, 'грудень': 11,
};

/**
 * Returns a readable Ukrainian date and ISO date string for a given day offset from reference date
 */
export function getRelativeDate(dayOffset: number, refDate: Date = new Date()): { date: string; dateIso: string } {
  const target = new Date(refDate.getFullYear(), refDate.getMonth(), refDate.getDate() + dayOffset);
  const day = target.getDate();
  const month = target.getMonth();
  const year = target.getFullYear();

  const date = `${day} ${UKRAINIAN_MONTHS[month]}`;
  const monthIso = String(month + 1).padStart(2, '0');
  const dayIso = String(day).padStart(2, '0');
  const dateIso = `${year}-${monthIso}-${dayIso}`;

  return { date, dateIso };
}

/**
 * Parses event date into a local Date object at midnight
 */
export function parseEventDate(event: EventItem, refDate: Date = new Date()): Date | null {
  // 1. If dateIso is available (YYYY-MM-DD)
  if (event.dateIso) {
    const parts = event.dateIso.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
        return new Date(year, month, day, 0, 0, 0, 0);
      }
    }
  }

  // 2. Check if event.date is an ISO format string
  const isoMatch = event.date.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (isoMatch) {
    const year = parseInt(isoMatch[1], 10);
    const month = parseInt(isoMatch[2], 10) - 1;
    const day = parseInt(isoMatch[3], 10);
    return new Date(year, month, day, 0, 0, 0, 0);
  }

  // 3. Check if event.date is Ukrainian formatted string like "5 вересня" or "5 вересня 2026"
  const uaMatch = event.date.match(/(\d{1,2})\s+([а-яіїєґ]+)(?:\s+(\d{4}))?/i);
  if (uaMatch) {
    const day = parseInt(uaMatch[1], 10);
    const monthName = uaMatch[2].toLowerCase();
    const year = uaMatch[3] ? parseInt(uaMatch[3], 10) : refDate.getFullYear();
    const month = UKRAINIAN_MONTHS_MAP[monthName];
    if (month !== undefined && !isNaN(day)) {
      return new Date(year, month, day, 0, 0, 0, 0);
    }
  }

  // 4. Fallback standard date parsing
  const parsed = new Date(event.date);
  if (!isNaN(parsed.getTime())) {
    return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate(), 0, 0, 0, 0);
  }

  return null;
}

/**
 * Checks if an event is planned for the next 7 days, including today.
 * Window: [Today 00:00:00, Today + 7 days 00:00:00)
 * Includes: Day 0 (today), Day 1, Day 2, Day 3, Day 4, Day 5, Day 6 (exactly 7 days)
 */
export function isEventInNext7Days(event: EventItem, refDate: Date = new Date()): boolean {
  const eventDate = parseEventDate(event, refDate);
  if (!eventDate) return false;

  const startOfToday = new Date(refDate.getFullYear(), refDate.getMonth(), refDate.getDate(), 0, 0, 0, 0);
  const endOf7Days = new Date(startOfToday);
  endOf7Days.setDate(endOf7Days.getDate() + 7);

  const eventTime = eventDate.getTime();
  return eventTime >= startOfToday.getTime() && eventTime < endOf7Days.getTime();
}

/**
 * Filters all events planned for the next 7 days (including today)
 */
export function getEventsForNext7Days(events: EventItem[], refDate: Date = new Date()): EventItem[] {
  return events.filter((e) => isEventInNext7Days(e, refDate));
}

/**
 * Randomly picks N events using Fisher-Yates shuffle
 */
export function pickRandomEvents(events: EventItem[], count: number = 3): EventItem[] {
  if (events.length <= count) {
    return [...events];
  }
  const shuffled = [...events];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}
