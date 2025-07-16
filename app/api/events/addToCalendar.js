import { NextResponse } from 'next/server';

export async function POST(req) {
  const { title, leader, date, time, location } = await req.json();

  // date: '24.01.2024', time: '8:00 AM - 8:30 AM' gibi geliyor
  // Başlangıç ve bitiş saatini ayır
  const [startTime, endTime] = time.split(' - ');
  const [day, month, year] = date.split('.');

  function toICSDate(dateStr, timeStr) {
    // dateStr: '24.01.2024', timeStr: '8:00 AM'
    const [day, month, year] = dateStr.split('.');
    const [h, m, ampm] = timeStr.match(/(\d+):(\d+) (AM|PM)/).slice(1);
    let hour = parseInt(h, 10);
    if (ampm === 'PM' && hour !== 12) hour += 12;
    if (ampm === 'AM' && hour === 12) hour = 0;
    return `${year}${month.padStart(2, '0')}${day.padStart(2, '0')}T${hour.toString().padStart(2, '0')}${m}00`;
  }

  const dtStart = toICSDate(date, startTime);
  const dtEnd = toICSDate(date, endTime);

  const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${title} (Led by ${leader})\nDTSTART:${dtStart}\nDTEND:${dtEnd}\nLOCATION:${location}\nDESCRIPTION:${title} - Led by ${leader}\nEND:VEVENT\nEND:VCALENDAR`;

  return new NextResponse(ics, {
    status: 200,
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename=event.ics`,
    },
  });
} 