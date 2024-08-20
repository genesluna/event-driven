import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function addTimeToDate(date: Date, timeString: string): Date {
  const newDate = new Date(date);

  const timeRegex = /^(0?[1-9]|1[0-2]):([0-5][0-9]) (AM|PM)$/i;
  const match = timeString.match(timeRegex);

  if (!match) {
    throw new Error('Invalid format. Use "HH:MM AM/PM".');
  }

  const [, hoursStr, minutesStr, period] = match;
  let hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  if (period.toUpperCase() === 'PM' && hours !== 12) {
    hours += 12;
  } else if (period.toUpperCase() === 'AM' && hours === 12) {
    hours = 0;
  }

  newDate.setHours(hours, minutes, 0, 0);

  return newDate;
}

export function formatTime(date: Date): string {
  let hours: number = date.getHours();
  const minutes: number = date.getMinutes();
  const ampm: string = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const formattedMinutes: string =
    minutes < 10 ? '0' + minutes : minutes.toString();

  const strTime: string = `${hours}:${formattedMinutes} ${ampm}`;
  return strTime;
}
