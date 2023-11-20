import { type UseQueryOptions, useQuery } from "@tanstack/react-query";
import type { AxiosRequestConfig } from "axios";
import type { ApiResponseT } from "../../lib/api";
import { $get } from "../../lib/axios";

const useGet = <DataT = unknown>(
  { url, params, ...axiosReqestConfig }: AxiosRequestConfig,
  useQueryOptions?: UseQueryOptions<ApiResponseT<DataT>>,
) =>
  useQuery({
    queryKey: [url, params],
    queryFn: ({ signal }) =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      $get<DataT>({ url, params, signal, ...axiosReqestConfig }),
    ...useQueryOptions,
  } as UseQueryOptions<ApiResponseT<DataT>>);

export default useGet;
