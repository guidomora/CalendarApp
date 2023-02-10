import { configureStore } from "@reduxjs/toolkit";
import { calendarSlice } from "../calendar/calendarSlice";
import { uiSlice } from "./uiSlice";

export const store = configureStore({
  reducer: {
    calendar: calendarSlice.reducer,
    ui: uiSlice.reducer,
  },
});
