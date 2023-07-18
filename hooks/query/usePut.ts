import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { ErrorResponseT } from "../../lib/api";
import { $put } from "../../lib/axios";

const usePut = <DataT = unknown, ReqT = unknown>(
  { url, params, ...axiosReqestConfig }: AxiosRequestConfig<ReqT>,
  useMutationOptions?: UseMutationOptions<DataT, ErrorResponseT, ReqT>,
) =>
  useMutation({
    mutationKey: [url, params],
    mutationFn: (data) =>
      $put<DataT>({ url, params, data, ...axiosReqestConfig }),
    ...useMutationOptions,
  } as UseMutationOptions<DataT, ErrorResponseT, ReqT>);

export default usePut;
