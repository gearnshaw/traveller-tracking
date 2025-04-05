/**
 * Formats a date into a simple relative time string (e.g. "2 hours ago", "just now", etc.)
 */
export const formatRelativeTime = (date: Date | number): string => {
  const now = Date.now();
  const timestamp = date instanceof Date ? date.getTime() : date;
  const seconds = Math.floor((now - timestamp) / 1000);

  // Define time thresholds
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;

  // Return the appropriate relative time string
  if (seconds < 30) {
    return 'just now';
  } else if (seconds < hour) {
    return 'in the last hour';
  } else if (seconds < day) {
    const hours = Math.floor(seconds / hour);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else if (seconds < week) {
    const days = Math.floor(seconds / day);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  } else if (seconds < month) {
    const weeks = Math.floor(seconds / week);
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  } else if (seconds < year) {
    const months = Math.floor(seconds / month);
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  } else {
    const years = Math.floor(seconds / year);
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
  }
};
