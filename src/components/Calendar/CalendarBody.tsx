import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setMonthIndex, setYear } from "../../redux/slices/calendarSlice";
import { Event } from "../../types";
import { formatDateToKebab, generateMiniCalendarDates } from "../../utils";
import { DAYS_OF_WEEK, EVENT_TYPE_COLORS } from "../../constants";
import { getMonth } from "date-fns";

interface Props {
  onDateClick: (date: string) => void;
  onEventClick: (
    event: Event,
    e: React.MouseEvent<Element, MouseEvent>
  ) => void;
  monthIndex: number;
  year: number;
}

const CalendarBody = ({
  onDateClick,
  onEventClick,
  monthIndex,
  year,
}: Props) => {
  const dispatch = useAppDispatch();
  const filteredEvents = useAppSelector((state) => state.events.filteredEvents);
  const calendarDates = generateMiniCalendarDates(year, monthIndex);

  const handleDateClick = (date: Date) => {
    const currentDate = new Date(year, monthIndex);
    const isCurrentMonth = date.getMonth() === currentDate.getMonth();

    if (isCurrentMonth) {
      onDateClick(formatDateToKebab(date));
    } else {
      dispatch(setMonthIndex(getMonth(date)));
      dispatch(setYear(date.getFullYear()));
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

          const eventsForDate = filteredEvents.filter((event) => {
            const eventDate = new Date(
              event.dateTime.split("./")[0].split(".").reverse().join("-")
            );

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
                  className="text-sm rounded-md  hover:bg-main-dark mt-1"
                  style={{ background: EVENT_TYPE_COLORS[event.type] }}
                  onClick={(e) => onEventClick(event, e)}
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
