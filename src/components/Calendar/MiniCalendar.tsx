import { useState, useEffect } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  isSameMonth,
  isSameDay,
  addDays,
  getMonth,
} from "date-fns";
import { useAppDispatch } from "../../redux/hooks";
import { setMonthIndex } from "../../redux/slices/calendarSlice";

interface MiniCalendarProps {
  monthIndex: number;
}

const MiniCalendar = ({ monthIndex }: MiniCalendarProps) => {
  const [currentMonth, setCurrentMonthState] = useState(new Date());

  const dispatch = useAppDispatch();

  useEffect(() => {
    setCurrentMonthState(new Date(currentMonth.getFullYear(), monthIndex));
  }, [monthIndex]);

  const prevMonth = () => {
    setCurrentMonthState(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonthState(addMonths(currentMonth, 1));
  };

  const handleDateClick = (date: Date) => {
    dispatch(setMonthIndex(getMonth(date)));
  };

  const renderDays = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Start on Monday
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 }); // End on Sunday

    const days = [];
    let day = startDate;
    while (day <= endDate) {
      days.push(day);
      day = addDays(day, 1);
    }

    return days.map((date) => (
      <div
        key={date.toString()}
        className={`text-center p-2 w-8 h-8 cursor-pointer ${
          isSameMonth(date, currentMonth) ? "text-black" : "text-gray-400"
        } ${
          isSameDay(date, new Date())
            ? "bg-main-dark text-white rounded-full"
            : ""
        }`}
        onClick={() => handleDateClick(date)}
      >
        {format(date, "d")}
      </div>
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="flex items-center justify-between p-2">
        <div onClick={prevMonth} className="cursor-pointer font-bold">
          &lt;
        </div>

        <span className="text-xs font-thin">
          {format(currentMonth, "MMMM yyyy")}
        </span>

        <div onClick={nextMonth} className="cursor-pointer font-bold">
          &gt;
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 px-2 text-xs font-thin">
        <div className="text-center w-8">M</div>
        <div className="text-center w-8">T</div>
        <div className="text-center w-8">W</div>
        <div className="text-center w-8">T</div>
        <div className="text-center w-8">F</div>
        <div className="text-center w-8">S</div>
        <div className="text-center w-8">S</div>
      </div>

      <div className="grid grid-cols-7 gap-1 p-2 text-xs font-thin">
        {renderDays()}
      </div>
    </div>
  );
};

export default MiniCalendar;
