// calendarSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Event } from '../../types'; // Replace with the correct path to your Event type

interface CalendarState {
  monthIndex: number;
  selectedDate: Date | null;
  events: Event[]; // Add the events array
  // Other calendar properties
}

const initialState: CalendarState = {
  monthIndex: new Date().getMonth(),
  selectedDate: null,
  events: [], // Initialize events array
  // Initialize other properties
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setMonthIndex(state, action: PayloadAction<number>) {
      state.monthIndex = action.payload;
    },
    setPrevMonth(state) {
      state.monthIndex--;
      if (state.monthIndex < 0) {
        state.monthIndex = 11;
      }
    },
    setNextMonth(state) {
      state.monthIndex++;
      if (state.monthIndex > 11) {
        state.monthIndex = 0;
      }
    },
    setSelectedDate(state, action: PayloadAction<Date>) {
      state.selectedDate = action.payload;
    },
    setEvents(state, action: PayloadAction<Event[]>) {
      state.events = action.payload;
    },
    // Other reducers
  },
});

export const { setMonthIndex, setPrevMonth, setNextMonth, setSelectedDate, setEvents } = calendarSlice.actions;

export default calendarSlice.reducer;
