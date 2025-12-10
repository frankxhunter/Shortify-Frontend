import { environment } from "../environments/environment";

const baseURL = environment.baseUrlBack;

export const API_URLS = {
  baseURL: baseURL,
  createURL: `${baseURL}/urls/create`,
  logInURL: `${baseURL}/login`,
  signUpURL: `${baseURL}/register`,
  googleAuth: `${baseURL}/auth/google`,
  getUrls: `${baseURL}/urls`,
  getRegisters: `${baseURL}/urls/{id}/requests`,
};
