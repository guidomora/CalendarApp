import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import esES from "date-fns/locale/es";
import NavBar from "../components/NavBar";
import { addHours, format, parse, startOfWeek, getDay } from "date-fns";
import { getMesagesES } from "../../helpers/getMesages";
import CalendarEventBox from "../components/CalendarEventBox";
import { useState } from "react";
import CalendarModal from "../components/CalendarModal";
import { useUiStore } from "../../hooks/useUiStore";
import useCalendarStore from "../../hooks/useCalendarStore";
import FabAddNew from "../components/FabAddNEw";
import FabDelete from "../components/FabDelete";

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

  // Para poder abrir el Modal
  const {openDateModal} = useUiStore()

  const {events, setActiveEvent} = useCalendarStore()

  // Si no hay ningun valor se manda week por defecto
  const [lastView, setLastView] = useState(localStorage.getItem("lastView") || "week")

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backGroundColor: "#347CF7",
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
