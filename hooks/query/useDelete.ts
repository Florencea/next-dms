import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { ErrorResponseT } from "../../lib/api";
import { $delete } from "../../lib/axios";

const useDelete = <DataT = unknown, ReqT = unknown>(
  { url, params, ...axiosReqestConfig }: AxiosRequestConfig<ReqT>,
  useMutationOptions?: UseMutationOptions<DataT, ErrorResponseT, ReqT>,
) =>
  useMutation({
    mutationKey: [url, params],
    mutationFn: (data) =>
      $delete<DataT>({ url, params, data, ...axiosReqestConfig }),
    ...useMutationOptions,
  } as UseMutationOptions<DataT, ErrorResponseT, ReqT>);

export default useDelete;
