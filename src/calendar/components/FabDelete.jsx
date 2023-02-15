
import React from "react";
import useCalendarStore from "../../hooks/useCalendarStore";


const FabDelete = () => {
  const { startDeletingEvent, hasEventSelected } = useCalendarStore();
  const handeDeleteEvent = () => {
    startDeletingEvent()
  };

  return (
    <button className="btn btn-danger fab-danger" onClick={handeDeleteEvent} style={{ display: hasEventSelected ? "" : "none"}}>
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};

export default FabDelete;
