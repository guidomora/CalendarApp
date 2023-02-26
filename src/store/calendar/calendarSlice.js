import { createSlice } from "@reduxjs/toolkit";
// const tempEvent = {
//   _id: new Date().getTime(),
//   title: "cumple del jefe",
//   notes: "hay que festejar",
//   start: new Date(),
//   end: addHours(new Date(), 2),
//   bgColor: "#fafafa",
//   user: {
//     _id: "123",
//     name: "Fernando",
//   },
// };

export const calendarSlice = createSlice({
  // Para manejar los eventos del calendario
  name: "calendar",
  initialState: {
    // propiedad para que cuando arranque la pagina sepa que tiene que cargar los eventos
    isLoadingEvents: true,
    events: [
      // tempEvent
    ],
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
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }) => {
      // Lo que regresa el map va a ser el nueva valor de nuestro state.events
      state.events = state.events.map((event) => {
        if (event.id === payload.id) {
          return payload;
        }

        return event;
      });
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        // Regresa todos los eventos cuyo id sea diferente al de la nota activa
        state.events = state.events.filter(
          (event) => event.id !== state.activeEvent.id
        );
        // para que ya no tengam,os ninguna nota activa
        state.activeEvent = null;
      }
    },

    // esto se va a llamar cuando ya tengo los eventos
    onLoadEvents: (state, { payload = [] }) => {
      state.isLoadingEvents = false;
      // confirmariamos si ya tenemos ese evento segun el id, si existe no hacemos nada,
      // si no existe se lo pushea al array
      payload.forEach((event) => {
        // si existe devuelve true
        const exists = state.events.some((dbEvent) => dbEvent.id === event.id);
        if (!exists) {
          state.events.push(event);
        }
      });
    },
    onLogoutCalendar: (state) => {
      state.isLoadingEvents = true,
      state.events = [];
      state.activeEvent = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
} = calendarSlice.actions;
