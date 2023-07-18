import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setMonthIndex } from '../../redux/slices/calendarSlice';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/20/solid';

const CalendarHeader = () => {
  const monthIndex = useAppSelector((state) => state.calendar.monthIndex);
  const dispatch = useAppDispatch();

  const handlePrevMonth = () => {
    dispatch(setMonthIndex(monthIndex - 1));
  };

  const handleNextMonth = () => {
    dispatch(setMonthIndex(monthIndex + 1));
  };

  const currentYear = new Date().getFullYear();

  const displayMonth = new Date(currentYear, monthIndex).toLocaleString('en-US', {
    month: 'long',
  });

  const displayYear = currentYear;

  return (
    <div className="flex justify-between mb-4">
      <button onClick={handlePrevMonth}>
        <ArrowLeftIcon className="h-5 w-5" />
      </button>

      <h2 className="text-lg font-semibold">
        {`${displayMonth} ${displayYear}`}
      </h2>

      <button onClick={handleNextMonth}>
        <ArrowRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default CalendarHeader;
