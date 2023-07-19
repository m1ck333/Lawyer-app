import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Event } from "../../types";

interface CalendarState {
  monthIndex: number;
  year: number;
  selectedDate: Date | null;
  events: Event[];
}

const initialState: CalendarState = {
  monthIndex: new Date().getMonth(),
  year: new Date().getFullYear(),
  selectedDate: null,
  events: [],
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setMonthIndex(state, action: PayloadAction<number>) {
      if (action.payload > 11) {
        state.monthIndex = 0;
        state.year = state.year + 1
      } else if (action.payload < 0) {
        state.monthIndex = 11;
        state.year = state.year - 1
      } else {
        state.monthIndex = action.payload;
      }
    },
    setYear(state, action: PayloadAction<number>) {
      state.year = action.payload;
    },
    setPrevMonth(state) {
      state.monthIndex--;
      if (state.monthIndex < 0) {
        state.monthIndex = 11;
        state.year--; // Decrease the year when going from January to December of the previous year
      }
    },
    setNextMonth(state) {
      state.monthIndex++;
      if (state.monthIndex > 11) {
        state.monthIndex = 0;
        state.year++; // Increase the year when going from December to January of the next year
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

export const {
  setMonthIndex,
  setYear,
  setPrevMonth,
  setNextMonth,
  setSelectedDate,
  setEvents,
} = calendarSlice.actions;

export default calendarSlice.reducer;
