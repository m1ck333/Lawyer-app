export const generateCalendarDates = (year: number, monthIndex: number): Date[] => {
  const firstDayOfMonth = new Date(year, monthIndex, 1);
  const startDayOfWeek = 1; // Monday (you can change this if you prefer Sunday as the start of the week)
  const dayOfWeekIndex = firstDayOfMonth.getDay();
  const daysToAdjust = (dayOfWeekIndex + 7 - startDayOfWeek) % 7;
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - daysToAdjust);

  const lastDayOfMonth = new Date(year, monthIndex + 1, 0);
  const endDate = new Date(lastDayOfMonth);
  const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);

  const calendarDates: Date[] = [];
  for (let i = 0; i < totalDays; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + i);
    calendarDates.push(currentDate);
  }

  return calendarDates;
};
