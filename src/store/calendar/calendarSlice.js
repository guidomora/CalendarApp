import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const tempEvent = {
  _id: new Date().getTime(),
  title: "cumple del jefe",
  notes: "hay que festejar",
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: "#fafafa",
  user: {
    _id: "123",
    name: "Fernando",
  },
};

export const calendarSlice = createSlice({
  // Para manejar los eventos del calendario
  name: "calendar",
  initialState: {
    events: [tempEvent],
    activeEvent: null,
  },
  reducers: {
    // Para activar la nota al hacerle clic
    onSetActiveEvent: (state, { payload }) => {
      // lo que sea que le mande se va a activar la nota
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);

      // Se limpia el activeEvent para poder crear otra nota
      state.activeEvent = null
    },
  },
});

// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent } = calendarSlice.actions;
