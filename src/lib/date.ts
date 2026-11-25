import { siteTimezone } from '@lib/config/site';

function toDate(value: Date | string | number): Date {
  return value instanceof Date ? value : new Date(value);
}

function formatParts(value: Date | string | number, timeZone = siteTimezone) {
  const date = toDate(value);
  if (Number.isNaN(date.getTime())) {
    return { year: '1970', month: '01', day: '01' };
  }
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const parts = formatter.formatToParts(date);
  const year = parts.find((p) => p.type === 'year')?.value ?? '1970';
  const month = parts.find((p) => p.type === 'month')?.value ?? '01';
  const day = parts.find((p) => p.type === 'day')?.value ?? '01';
  return { year, month, day };
}

function formatDate(value: Date | string | number, timeZone = siteTimezone): string {
  const { year, month, day } = formatParts(value, timeZone);
  return `${year}-${month}-${day}`;
}

export const displayDate = Object.assign(formatDate, {
  date: formatDate,
  year(value: Date | string | number, timeZone = siteTimezone): string {
    return formatParts(value, timeZone).year;
  },
  short(value: Date | string | number, timeZone = siteTimezone): string {
    const { month, day } = formatParts(value, timeZone);
    return `${month}-${day}`;
  },
});
