import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import type { AxiosRequestConfig } from "axios";
import type { ApiResponseT, ErrorResponseT } from "../../lib/api";
import { $delete } from "../../lib/axios";

const useDelete = <DataT = unknown, ReqT = unknown>(
  { url, params, ...axiosReqestConfig }: AxiosRequestConfig<ReqT>,
  useMutationOptions?: UseMutationOptions<
    ApiResponseT<DataT>,
    ApiResponseT<ErrorResponseT>,
    ReqT
  >,
) =>
  useMutation({
    mutationKey: [url, params],
    mutationFn: (data) =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      $delete<DataT>({ url, params, data, ...axiosReqestConfig }),
    ...useMutationOptions,
  } as UseMutationOptions<
    ApiResponseT<DataT>,
    ApiResponseT<ErrorResponseT>,
    ReqT
  >);

export default useDelete;
