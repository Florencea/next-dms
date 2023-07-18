import axios, { AxiosRequestConfig } from "axios";
import { ApiResponseT } from "./api";

const AXIOS_INSTANCE = axios.create({
  baseURL: "/api",
  timeout: 10000,
  withCredentials: true,
  paramsSerializer: {
    indexes: null,
  },
});

export const $get = async <DataT = unknown>(
  axiosReqestConfig: AxiosRequestConfig,
) => {
  const res = await AXIOS_INSTANCE<ApiResponseT<DataT>>({
    method: "GET",
    ...axiosReqestConfig,
  });
  return res.data;
};

export const $post = async <DataT = unknown, ReqT = unknown>(
  axiosReqestConfig: AxiosRequestConfig<ReqT>,
) => {
  const res = await AXIOS_INSTANCE<ApiResponseT<DataT>>({
    method: "POST",
    ...axiosReqestConfig,
  });
  return res.data;
};

export const $put = async <DataT = unknown, ReqT = unknown>(
  axiosReqestConfig: AxiosRequestConfig<ReqT>,
) => {
  const res = await AXIOS_INSTANCE<ApiResponseT<DataT>>({
    method: "PUT",
    ...axiosReqestConfig,
  });
  return res.data;
};

export const $delete = async <DataT = unknown, ReqT = unknown>(
  axiosReqestConfig: AxiosRequestConfig<ReqT>,
) => {
  const res = await AXIOS_INSTANCE<ApiResponseT<DataT>>({
    method: "DELETE",
    ...axiosReqestConfig,
  });
  return res.data;
};
