/**
 * NomadX Calendar Export Utility (.ics / RFC 5545 standard)
 * Exports structured work-life itinerary blocks directly into Google Calendar,
 * Apple Calendar, Outlook, or mobile calendar apps.
 */

export interface CalendarEventBlock {
  title: string;
  description: string;
  startTime: string; // e.g. "09:00"
  endTime: string;   // e.g. "13:00"
  location?: string;
  category?: string;
}

function formatICSDate(date: Date, timeStr: string): string {
  const [hours, minutes] = timeStr.split(':').map((n) => parseInt(n, 10));
  const d = new Date(date);
  d.setHours(hours, minutes, 0, 0);

  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
  const year = d.getUTCFullYear();
  const month = pad(d.getUTCMonth() + 1);
  const day = pad(d.getUTCDate());
  const hh = pad(d.getUTCHours());
  const mm = pad(d.getUTCMinutes());
  const ss = pad(d.getUTCSeconds());

  return `${year}${month}${day}T${hh}${mm}${ss}Z`;
}

function parseTimeRange(timeStr: string): { start: string; end: string } {
  // Handles strings like "09:00 AM - 01:00 PM" or "09:00 - 13:00"
  try {
    const parts = timeStr.split('-').map((s) => s.trim());
    if (parts.length === 2) {
      const parseSingleTime = (t: string): string => {
        const isPM = /pm/i.test(t);
        const isAM = /am/i.test(t);
        const clean = t.replace(/(am|pm)/gi, '').trim();
        const [hStr, mStr] = clean.split(':');
        let hours = parseInt(hStr, 10);
        const minutes = mStr ? parseInt(mStr, 10) : 0;
        if (isPM && hours < 12) hours += 12;
        if (isAM && hours === 12) hours = 0;
        const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
        return `${pad(hours)}:${pad(minutes)}`;
      };
      return {
        start: parseSingleTime(parts[0]),
        end: parseSingleTime(parts[1]),
      };
    }
  } catch {
    // Fallback default
  }
  return { start: '09:00', end: '11:00' };
}

export function generateICSContent(
  destinationName: string,
  dayTheme: string,
  blocks: {
    time: string;
    title: string;
    description: string;
    venueRecommendation: string;
    category?: string;
    wifiTestedMbps?: number;
  }[],
  startDate?: Date
): string {
  const baseDate = startDate || new Date();
  // Ensure base date is tomorrow to be practical
  const eventDate = new Date(baseDate);
  eventDate.setDate(eventDate.getDate() + 1);

  const icsLines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//NomadX//Nomad Retreats Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:NomadX - ${destinationName} Itinerary`,
    'X-WR-TIMEZONE:Asia/Kolkata',
  ];

  blocks.forEach((block, idx) => {
    const { start, end } = parseTimeRange(block.time);
    const dtStart = formatICSDate(eventDate, start);
    const dtEnd = formatICSDate(eventDate, end);
    const uid = `nomadx-${Date.now()}-${idx}@nomadx.earth`;
    const summary = `[NomadX] ${block.title}`;
    const venue = block.venueRecommendation || destinationName;
    const wifiInfo = block.wifiTestedMbps ? `\nTested Wi-Fi: ${block.wifiTestedMbps} Mbps` : '';
    const description = `${block.description}\n\nVenue: ${venue}${wifiInfo}\nDay Theme: ${dayTheme}\nPlatform: NomadX (Earn Where You Explore)`;

    icsLines.push('BEGIN:VEVENT');
    icsLines.push(`UID:${uid}`);
    icsLines.push(`DTSTAMP:${formatICSDate(new Date(), '12:00')}`);
    icsLines.push(`DTSTART:${dtStart}`);
    icsLines.push(`DTEND:${dtEnd}`);
    icsLines.push(`SUMMARY:${summary}`);
    icsLines.push(`DESCRIPTION:${description.replace(/\n/g, '\\n')}`);
    icsLines.push(`LOCATION:${venue.replace(/,/g, '\\,')}`);
    icsLines.push('STATUS:CONFIRMED');
    icsLines.push('END:VEVENT');
  });

  icsLines.push('END:VCALENDAR');
  return icsLines.join('\r\n');
}

export function downloadICSFile(filename: string, content: string): void {
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename.endsWith('.ics') ? filename : `${filename}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
