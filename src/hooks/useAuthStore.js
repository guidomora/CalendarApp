//  tiene como obj realizar cualquier interaccion con
//  la parte de auth en nuestro store

import { useDispatch, useSelector } from "react-redux";
import calendarApi from "../api/calendarApi";
import {
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
} from "../store/auth/authSlice";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();




  
  const startLogin = async ({ mail, password }) => {
    dispatch(onChecking());

    try {
      // llegamos al backend
      // solo le ponemos "/auth" pq el resto ya se lo habiamos pasado a axios
      const { data } = await calendarApi.post("/auth", { mail, password });
      // guardamos el token en el localStorage
      localStorage.setItem("token", data.token);

      // lo mismo pero indicamos la fecha en la que se creo el token y mas adelante podriamos
      // usarlo para indicar cuando renovar el token
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(onLogout("Credenciales incorrectas"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };






  const startRegister = async ({ name, mail, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post("/auth/new", {
        name,
        mail,
        password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(onLogout(error.response.data?.msg || "--"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };





  // va a ser llamada en un lugar especifico
  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogout());

    try {
      const { data } = await calendarApi.get("auth/renew");
      // el nuevo token se almacena en el localStorage
      localStorage.setItem("token", data.token)
      //  se almacena la nueva fecha de creacion 
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      // como en esta intancia no estaria funcionando el token, lo borramos el localStorage
      // y se hace un logout
      localStorage.clear()
      dispatch(onLogout());
    }
  };



  const startLogout = () => {
    localStorage.clear()
    dispatch(onLogout())
  }


  return {
    // propiedades
    status,
    user,
    errorMessage,

    //  metodos que la gente va a poder llamar para interactuar
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout,
  };
};
