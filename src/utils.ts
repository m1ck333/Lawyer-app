export const generateCalendarDates = (monthIndex: number): Date[] => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const firstDayOfMonth = new Date(currentYear, monthIndex, 1);
  const lastDayOfMonth = new Date(currentYear, monthIndex + 1, 0);
  const startDate = new Date(
    firstDayOfMonth.getFullYear(),
    firstDayOfMonth.getMonth(),
    firstDayOfMonth.getDate() - firstDayOfMonth.getDay()
  );
  const endDate = new Date(
    lastDayOfMonth.getFullYear(),
    lastDayOfMonth.getMonth(),
    lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay())
  );

  const calendarDates: Date[] = [];
  let currentDateIter = startDate;

  while (currentDateIter <= endDate) {
    calendarDates.push(new Date(currentDateIter));
    currentDateIter.setDate(currentDateIter.getDate() + 1);
  }

  return calendarDates;
};
