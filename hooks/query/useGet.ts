import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { $get } from "../../lib/axios";

const useGet = <DataT = unknown>(
  { url, params, ...axiosReqestConfig }: AxiosRequestConfig,
  useQueryOptions?: UseQueryOptions<DataT>,
) =>
  useQuery({
    queryKey: [url, params],
    queryFn: ({ signal }) =>
      $get<DataT>({ url, params, signal, ...axiosReqestConfig }),
    ...useQueryOptions,
  } as UseQueryOptions<DataT>);

export default useGet;
