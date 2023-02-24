import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";

// para no mandar en duro la url
const { VITE_API_URL } = getEnvVariables();

const calendarApi = axios.create({
  baseURL: VITE_API_URL,
});


// configuracion de interceptores

export default calendarApi;
