import axios from "axios";

import { BASE_URL } from "constants/index";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});
export type { AxiosError } from "axios";
