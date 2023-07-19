import { useState, useEffect } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { setMonthIndex } from '../../redux/slices/calendarSlice';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/20/solid';
import { format, startOfMonth } from 'date-fns';

interface Props {
  monthIndex: number;
  year: number;
}

const CalendarHeader = ({year, monthIndex}: Props) => {
  const [currentMonth, setCurrentMonth] = useState(() => startOfMonth(new Date()));

  const dispatch = useAppDispatch();

  useEffect(() => {
    setCurrentMonth(startOfMonth(new Date(new Date().getFullYear(), monthIndex)));
  }, [monthIndex]);

  const handlePrevMonth = () => {
    dispatch(setMonthIndex(monthIndex - 1));
  };

  const handleNextMonth = () => {
    dispatch(setMonthIndex(monthIndex + 1));
  };

  const displayMonth = format(currentMonth, 'MMMM');

  return (
    <div className="flex justify-between mb-4">
      <button onClick={handlePrevMonth}>
        <ArrowLeftIcon className="h-5 w-5" />
      </button>

      <h2 className="text-lg font-semibold">
        {`${displayMonth} ${year}`}
      </h2>

      <button onClick={handleNextMonth}>
        <ArrowRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default CalendarHeader;
