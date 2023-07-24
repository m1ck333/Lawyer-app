import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CalendarState {
  monthIndex: number;
  year: number;
  selectedDate: Date | null;
}

const initialState: CalendarState = {
  monthIndex: new Date().getMonth(),
  year: new Date().getFullYear(),
  selectedDate: null,
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setMonthIndex(state, action: PayloadAction<number>) {
      if (action.payload > 11) {
        state.monthIndex = 0;
        state.year = state.year + 1;
      } else if (action.payload < 0) {
        state.monthIndex = 11;
        state.year = state.year - 1;
      } else {
        state.monthIndex = action.payload;
      }
    },
    setYear(state, action: PayloadAction<number>) {
      state.year = action.payload;
    },
  },
});

export const { setMonthIndex, setYear } = calendarSlice.actions;

export default calendarSlice.reducer;
