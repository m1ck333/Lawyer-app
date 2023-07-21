import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  addDays,
} from "date-fns";

export const generateMiniCalendarDates = (year: number, monthIndex: number): Date[] => {
  const currentDate = startOfMonth(new Date(year, monthIndex));
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Start on Monday
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 }); // End on Sunday

  const days = [];

  let day = startDate;
  
  while (day <= endDate) {
    days.push(day);
    day = addDays(day, 1);
  }

  return days;
};
