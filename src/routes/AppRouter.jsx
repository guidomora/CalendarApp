import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../auth/pages/LoginPage";
import CalendarPage from "../calendar/pages/CalendarPage";
import { useAuthStore } from "../hooks/useAuthStore";

const AppRouter = () => {

  const { status, checkAuthToken } = useAuthStore()


  useEffect(() => {
    checkAuthToken()
  }, [])


  if (status === "checking") {
    return (<h3>Cargando...</h3>)
  }

  return (
    <Routes>
      {status === "not-authenticated" ? (
        /* Cualquier ruta que entre va a estar mostrando el LoginPage */

        (
          <>
            <Route path="/auth/*" element={<LoginPage />} />
            {/* Este no seria obligatorio agregarlo, pero por si llega a fallar el ternario */}
            <Route path="/*" element={<Navigate to="/auth/login" />} />
          </>
        )
      ) :
        (/* Cualquier ruta que no sea la de arriba, va a estar entrando al CalendarPage */
          (
            <>
              <Route path="/" element={<CalendarPage />} />
              <Route path="/*" element={<Navigate to="/" />} />
            </>
          ))}
    </Routes>
  );
};

export default AppRouter;
