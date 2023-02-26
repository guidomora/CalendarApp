import { parseISO } from "date-fns";

// recibimos los eventos y como valor por defecto pnemos un array vacio
export const eventsToDateEvents = (events = []) => {
  return events.map((event) => {
    event.start = parseISO(event.start);
    event.end = parseISO(event.end);

    return event;
  });
};
