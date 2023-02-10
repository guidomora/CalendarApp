import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onSetActiveEvent } from "../store/calendar/calendarSlice";

const useCalendarStore = () => {
  const dispatch = useDispatch()

  const { events, activeEvent } = useSelector((state) => state.calendar);

  const setActiveEvent = (calendarEvent) => {
    // calendarSlice
    dispatch(onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async (calendarEvent) => {
    if (calendarEvent._id) {
      // actualizando
    } else {
      // creando
      dispatch(onAddNewEvent({...calendarEvent, _id: new Date().getTime()}))
    }
  }

  return {
    events,
    activeEvent,
    setActiveEvent,
    startSavingEvent,
  };
};

export default useCalendarStore;
