import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { ApiResponseT } from "../../lib/api";
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
