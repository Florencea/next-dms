import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { ApiResponseT, ErrorResponseT } from "../../lib/api";
import { $patch } from "../../lib/axios";

const usePatch = <DataT = unknown, ReqT = unknown>(
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
      $patch<DataT>({ url, params, data, ...axiosReqestConfig }),
    ...useMutationOptions,
  } as UseMutationOptions<
    ApiResponseT<DataT>,
    ApiResponseT<ErrorResponseT>,
    ReqT
  >);

export default usePatch;
