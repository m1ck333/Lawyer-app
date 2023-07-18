import { useAppDispatch } from "../../redux/hooks";
import { Event } from "../../types";
import { generateCalendarDates } from "../../utils";
import { setMonthIndex } from "../../redux/slices/calendarSlice";

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

interface CalendarDayProps {
  onDateClick: (date: Date, event: Event[]) => void;
  events: Event[];
  monthIndex: number;
}

const CalendarDay: React.FC<CalendarDayProps> = ({
  onDateClick,
  events,
  monthIndex,
}) => {
  const dispatch = useAppDispatch();
  const calendarDates = generateCalendarDates(monthIndex);

  const handleDateClick = (date: Date) => {
    const isCurrentMonth = date.getMonth() === monthIndex;

    if (isCurrentMonth) {
      onDateClick(date, events);
    } else {
      const newMonthIndex = date.getMonth();
      dispatch(setMonthIndex(newMonthIndex));
    }
  };

  return (
    <div>
      <div className="grid grid-cols-7 gap-2 mb-6">
        {DAYS_OF_WEEK.map((day) => (
          <div key={day} className="text-center font-bold text-mine-light">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {calendarDates.map((date) => {
          const isCurrentMonth = date.getMonth() === monthIndex;
          const isToday = date.toDateString() === new Date().toDateString();

          const eventsForDate = events.filter((event) => {
            const eventDate = new Date(event.date);
            return (
              eventDate.getDate() === date.getDate() &&
              eventDate.getMonth() === date.getMonth() &&
              eventDate.getFullYear() === date.getFullYear()
            );
          });

          return (
            <div
              key={date.toISOString()}
              className={`
                text-center cursor-pointer rounded-md p-4 h-32 text-main-light
                ${
                  !isCurrentMonth
                    ? "bg-minor-dark opacity-20"
                    : isToday
                    ? "font-bold bg-minor-light"
                    : "hover:bg-minor-light"
                }
              `}
              onClick={() => handleDateClick(date)}
            >
              {date.getDate()}

              {eventsForDate.map((event) => (
                <div key={event.id} className="text-sm text-blue-500 mt-1">
                  {event.title}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarDay;
