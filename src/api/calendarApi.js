import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";

// para no mandar en duro la url
const { VITE_API_URL } = getEnvVariables();

const calendarApi = axios.create({
  baseURL: VITE_API_URL,
});


// configuracion de interceptores
// nos permiten interceptar las peticiones que van hacia el backend o regresan de el 

// antes de que se haga la request usa el interceptor
calendarApi.interceptors.request.use(config => {
  config.headers = {
    ...config.headers,
    "x-token": localStorage.getItem("token")
  }
  return config
})


export default calendarApi;
