import { format as dateFnsFormat, addMinutes } from 'date-fns';

export type DateFormatType = 'dateOnly' | 'dateAndTime';

/**
 * small abstraction over `date-fns/format` function
 *
 * If the provided `date` is not a valid date, this function return it without modifying.
 *
 * @param date date value to be formatted
 * @param options
 * @param options.formatType convenient shorthand to specify the format, can be 'dateAndTime' or 'dateOnly'. Use to provide default for options.format
 * @param options.format format string that will be passed to second parameter of `date-fns/format`
 */
export const formatDate = (
  date: string | Date,
  {
    formatType = 'dateOnly',
    format = formatType === 'dateOnly'
      ? FORMAT_STRING.dayOnly
      : FORMAT_STRING.dayAndTime,
  }: {
    formatType?: DateFormatType;
    format?: string;
  } = {}
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  return isNaN(dateObj.getTime())
    ? (date as string)
    : dateFnsFormat(dateObj, format);
};

const FORMAT_STRING = {
  dayOnly: 'd MMM yyyy',
  dayAndTime: 'd MMM yyyy, h:mm a',
} as const;

export const toDate = (date: string | Date): Date | undefined => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  return isNaN(dateObj.getTime()) ? undefined : dateObj;
};

/**
 * format a date to UTC date format, e.g. `'2021-02-03T16:00:00.000Z'`.
 *
 * Reference: https://github.com/date-fns/date-fns/issues/1401#issuecomment-578580199.
 *
 * @param date the date that you want to format
 */
export const formatDateUtc = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return dateFnsFormat(
    addMinutes(d, d.getTimezoneOffset()),
    "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
  );
};
