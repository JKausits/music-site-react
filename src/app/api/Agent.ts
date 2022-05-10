import axios, { AxiosResponse } from "axios";
import { tokenName } from "../hooks/useAuthentication";
import { DateTransformer } from "../transformers/DateTransformer";
import applyCaseMiddleware from "axios-case-converter";

export const createAgent = (baseURL: string) => {
  let agent = axios.create({
    baseURL,
  });

  if (process.env.REACT_APP_BACKEND_LANGUAGE === "RAILS")
    agent = applyCaseMiddleware(agent);

  agent.interceptors.request.use((config) => {
    const token = localStorage.getItem(tokenName);
    if (token != null)
      config.headers = {
        Authorization: `Bearer ${localStorage.getItem(tokenName)}`,
      };

    return config;
  });

  agent.interceptors.response.use((response) => {
    DateTransformer.fromResponseBody(response.data);
    return response;
  });

  const responseBody = <T>(response: AxiosResponse<T>) => response.data;

  const getRequest = <T>(url: string, options: {} = {}) =>
    agent.get<T>(url, options).then(responseBody);
  const postRequest = <T>(url: string, body: {}, options: {} = {}) =>
    agent.post<T>(url, body, options).then(responseBody);
  const putRequest = <T>(url: string, body: {}) =>
    agent.put<T>(url, body).then(responseBody);
  const patchRequest = <T>(url: string, body: {}) =>
    agent.patch<T>(url, body).then(responseBody);
  const deleteRequest = <T>(url: string) =>
    agent.delete<T>(url).then(responseBody);
  return {
    agent,
    getRequest,
    postRequest,
    putRequest,
    patchRequest,
    deleteRequest,
  };
};

export const agent = createAgent(process.env.REACT_APP_API_URL || "");
