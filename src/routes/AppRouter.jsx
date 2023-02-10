import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../auth/pages/LoginPage";
import CalendarPage from "../calendar/pages/CalendarPage";

const AppRouter = () => {
  const authStatus = "authenticated";

  return (
    <Routes>
      {authStatus === "not-authenticated" ? (
        /* Cualquier ruta que entre va a estar mostrando el LoginPage */
        <Route path="/auth/*" element={<LoginPage />} />) : 

      (/* Cualquier ruta que no sea la de arriba, va a estar entrando al CalendarPage */
        <Route path="/*" element={<CalendarPage />} />)}

        {/* Este no seria obligatorio agregarlo, pero por si llega a fallar el ternario */}
        <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};

export default AppRouter;
