const DATE_TOKEN = '{{DOWNLOAD_DATE}}';

export function resumeDateToken() {
  return DATE_TOKEN;
}

export function resumeDownloadDate(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).formatToParts(now);

  const day = parts.find((part) => part.type === 'day')?.value;
  const month = parts.find((part) => part.type === 'month')?.value;
  const year = parts.find((part) => part.type === 'year')?.value;

  if (!day || !month || !year) {
    throw new Error('Could not format the download date');
  }

  const iso = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);

  return {
    label: `${day} ${month} ${year}`,
    iso,
  };
}
