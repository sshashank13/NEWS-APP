const rtf =
  typeof Intl !== 'undefined' && Intl.RelativeTimeFormat
    ? new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
    : null;

const UNITS = [
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
];

// "2 hours ago", "yesterday", etc. Falls back to a plain date if Intl is unavailable.
export function timeAgo(iso) {
  if (!iso) return '';
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return '';
  const seconds = Math.round((then - Date.now()) / 1000);
  if (!rtf) return new Date(then).toLocaleDateString();
  for (const [unit, size] of UNITS) {
    if (Math.abs(seconds) >= size) return rtf.format(Math.round(seconds / size), unit);
  }
  return 'just now';
}
