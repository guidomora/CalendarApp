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
    onUpdateEvent: (state, {payload}) => {
      // Lo que regresa el map va a ser el nueva valor de nuestro state.events
      state.events = state.events.map( event => {
        if (event._id === payload._id) {
          return payload
        }
        
        return event
      })
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        // Regresa todos los eventos cuyo id sea diferente al de la nota activa
      state.events = state.events.filter(event => event._id !== state.activeEvent._id)
      // para que ya no tengam,os ninguna nota activa
      state.activeEvent = null
      }
      
    }
  },
});

// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;
