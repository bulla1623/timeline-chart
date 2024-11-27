import {
  startOfMonth,
  endOfMonth,
  addDays,
  subDays
} from 'date-fns';

export const getDateRange = (view, date) => {
  switch (view) {
    case 'month':
      return {
        start: startOfMonth(date),
        end: endOfMonth(date)
      };
    case 'week':
      return {
        start: subDays(date, date.getDay()),
        end: addDays(date, 6 - date.getDay())
      };
    case 'day':
      return {
        start: date,
        end: date
      };
    default:
      throw new Error(`Unsupported view: ${view}`);
  };
};
