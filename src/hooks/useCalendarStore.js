import { useDispatch, useSelector } from "react-redux";
import { onSetActiveEvent } from "../store/calendar/calendarSlice";

const useCalendarStore = () => {
  const dispatch = useDispatch()

  const { events, activeEvent } = useSelector((state) => state.calendar);

  const setActiveEvent = (calendarEvent) => {
    // calendarSlice
    dispatch(onSetActiveEvent(calendarEvent))
  }

  return {
    events,
    activeEvent,
    setActiveEvent,
  };
};

export default useCalendarStore;
