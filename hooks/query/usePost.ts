import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { ApiResponseT, ErrorResponseT } from "../../lib/api";
import { $post } from "../../lib/axios";

const usePost = <DataT = unknown, ReqT = unknown>(
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
      $post<DataT>({ url, params, data, ...axiosReqestConfig }),
    ...useMutationOptions,
  } as UseMutationOptions<
    ApiResponseT<DataT>,
    ApiResponseT<ErrorResponseT>,
    ReqT
  >);

export default usePost;
