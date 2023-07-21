import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import calendarReducer from "./slices/calendarSlice";
import eventReducer from "./slices/eventSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    calendar: calendarReducer,
    events: eventReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
