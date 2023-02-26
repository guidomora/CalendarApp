import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import esES from "date-fns/locale/es";
import NavBar from "../components/NavBar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { getMesagesES } from "../../helpers/getMesages";
import CalendarEventBox from "../components/CalendarEventBox";
import { useEffect, useState } from "react";
import CalendarModal from "../components/CalendarModal";
import { useUiStore } from "../../hooks/useUiStore";
import useCalendarStore from "../../hooks/useCalendarStore";
import FabAddNew from "../components/FabAddNew";
import FabDelete from "../components/FabDelete";
import { useAuthStore } from "../../hooks/useAuthStore";

const locales = {
  es: esES,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});


const CalendarPage = () => {
  const {user} = useAuthStore()

 
  // Para poder abrir el Modal
  const {openDateModal} = useUiStore()

  const {events, setActiveEvent, startLoadingEvents} = useCalendarStore()

  // Si no hay ningun valor se manda week por defecto
  const [lastView, setLastView] = useState(localStorage.getItem("lastView") || "week")

  const eventStyleGetter = (event, start, end, isSelected) => {

    // detecta si es un evento mio y responde como un booleano
    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid)

    const style = {
      backGroundColor: isMyEvent ? "#347CF7" : "#465660",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white"
    }

    return {
      style
    }
  }

  // Para poder abrir el Modal
  const onDoubleClick = () => {
    openDateModal()
  }
  const onSelect = (event) => {
    setActiveEvent(event)
  }

  // Nos dice en que modo de vista estamos: mes semana o dia
  const onViewChanged = (event) => {
    localStorage.setItem("lastView", event)
    setLastView(event)
  }

  useEffect(() => {
    startLoadingEvents()
  }, [])
  
  

  return (
    <>
      <NavBar />

      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc( 100vh - 80px)" }}
        messages={getMesagesES()}
        eventPropGetter={eventStyleGetter}
        components ={{
          event: CalendarEventBox
        }}
        onDoubleClickEvent = {onDoubleClick}
        onSelectEvent={onSelect}
        onView = {onViewChanged}
      />
      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};

export default CalendarPage;
