import { useAppDispatch } from "../../redux/hooks";
import { setMonthIndex } from "../../redux/slices/calendarSlice";
import { Event } from "../../types";
import { generateCalendarDates } from "../../utils";
import { DAYS_OF_WEEK } from "../../constants";

interface Props {
  onDateClick: (date: Date, event: Event[]) => void;
  onEventClick: (date: Date, event: Event, e: React.MouseEvent) => void
  events: Event[];
  monthIndex: number;
  year: number;
}

const CalendarBody = ({ onDateClick, onEventClick, events, monthIndex, year }: Props) => {
  const dispatch = useAppDispatch();
  const calendarDates = generateCalendarDates(year, monthIndex);

  const handleDateClick = (date: Date) => {
    const isCurrentMonth = date.getMonth() === monthIndex;
    const newMonthIndex = date.getMonth();

    if (isCurrentMonth) {
      onDateClick(date, events);
    } else {
      // Check if the clicked date is in December of the previous year
      if (newMonthIndex === 11 && monthIndex === 0) {
        // Change to January of the next year
        dispatch(setMonthIndex(-1));
      } else if (newMonthIndex === 0 && monthIndex === 11) {
        // Change to December of the previous year
        dispatch(setMonthIndex(12));
      } else {
        // Change to the selected month
        dispatch(setMonthIndex(newMonthIndex));
      }
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
                text-center cursor-pointer rounded-md px-1 h-32 text-main-light overflow-auto no-scrollbar
                ${
                  !isCurrentMonth
                    ? "bg-minor-dark opacity-20"
                    : isToday
                    ? "font-bold bg-minor-light"
                    : "bg-minor-dark hover:bg-minor-light"
                }
              `}
              onClick={() => handleDateClick(date)}
            >
              {date.getDate()}

              {eventsForDate.map((event) => (
                <div
                  key={event.id}
                  className="text-sm bg-blue-500 rounded-md  hover:bg-main-dark mt-1"
                  onClick={(e) => onEventClick(date, event, e)}
                >
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

export default CalendarBody;
