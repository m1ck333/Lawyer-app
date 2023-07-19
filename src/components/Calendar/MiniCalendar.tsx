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
import { setMonthIndex, setYear } from "../../redux/slices/calendarSlice";
import { DAYS_OF_WEEK_SHORT } from "../../constants";

interface MiniCalendarProps {
  monthIndex: number;
  year: number;
}

const MiniCalendar = ({ monthIndex, year }: MiniCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(() =>
    startOfMonth(new Date())
  );

  const [currentMonthIndex, setCurrentMonthIndex] = useState(monthIndex);
  const [currentYear, setCurrentYear] = useState(year);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setCurrentMonthIndex(monthIndex);
  }, [monthIndex]);

  useEffect(() => {
    setCurrentYear(year);
  }, [year]);

  useEffect(() => {
    setCurrentDate(startOfMonth(new Date(currentYear, currentMonthIndex)));

    if (currentMonthIndex < 0) {
      setCurrentMonthIndex(11);
      setCurrentYear((prev) => prev - 1);
    } else if (currentMonthIndex > 11) {
      setCurrentMonthIndex(0);
      setCurrentYear((prev) => prev + 1);
    }
  }, [currentYear, currentMonthIndex]);

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
    setCurrentMonthIndex((prev) => prev - 1);
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
    setCurrentMonthIndex((prev) => prev + 1);
  };

  const handleDateClick = (date: Date) => {
    dispatch(setMonthIndex(getMonth(date)));
    dispatch(setYear(currentYear));
  };
  const renderDays = () => {
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

    return days.map((date) => (
      <div
        key={date.toString()}
        className={`text-center p-2 w-8 h-8 cursor-pointer ${
          isSameMonth(date, currentDate) ? "text-black" : "text-gray-400"
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
          {format(currentDate, "MMMM")} {currentYear}
        </span>

        <div onClick={nextMonth} className="cursor-pointer font-bold">
          &gt;
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 px-2 text-xs font-thin">
        {DAYS_OF_WEEK_SHORT.map((day, i) => (
          <div key={i} className="text-center w-8">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 p-2 text-xs font-thin">
        {renderDays()}
      </div>
    </div>
  );
};

export default MiniCalendar;
