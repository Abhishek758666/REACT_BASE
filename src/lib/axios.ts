import axios, { AxiosRequestConfig } from "axios";
import { API_BASE_URL } from "./config";
import { handleApiError } from "../utils/helpers";

const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
  timeout: 50000,
});

instance.interceptors.request.use(
  function (request) {
    return request;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const doGet = async (
  url: string,
  config?: AxiosRequestConfig<any> | undefined
) => {
  try {
    const response = await instance.get(url, config);
    return response.data.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const doPost = async (
  url: string,
  data?: {} | undefined,
  config?: AxiosRequestConfig<any> | undefined
) => {
  try {
    const response = await instance.post(url, data, config);
    return response.data.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const doPut = async (
  url: string,
  data?: {} | undefined,
  config?: AxiosRequestConfig<any> | undefined
) => {
  try {
    const response = await instance.put(url, data, config);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const doPatch = async (
  url: string,
  data?: {} | undefined,
  config?: AxiosRequestConfig<any> | undefined
) => {
  try {
    const response = await instance.patch(url, data, config);
    return response.data.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const doDelete = async (
  url: string,
  config?: AxiosRequestConfig<any> | undefined
) => {
  try {
    const response = await instance.delete(url, config);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};
