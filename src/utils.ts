import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  addDays,
} from "date-fns";
import { Event } from "./types";

export const generateMiniCalendarDates = (
  year: number,
  monthIndex: number
): Date[] => {
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

export const formatDateToKebab = (date: Date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

export const getNextSevenDaysWithEvents = (events: Event[]) => {
  const today = new Date();
  const nextSevenDaysWithEvents = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);

    date.setDate(today.getDate() + i);

    const eventsOnDate = events.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });

    nextSevenDaysWithEvents.push({
      date: date.toDateString(),
      events: eventsOnDate,
    });
  }

  return nextSevenDaysWithEvents;
};
