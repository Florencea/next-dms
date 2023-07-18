import { log } from "@prisma/client";
import { useSetState } from "ahooks";
import { TableProps, Tag } from "antd";
import { useMemo } from "react";
import { PaginatedDataT } from "../lib/api";
import { LogParamsT } from "../lib/log";
import useGet from "./query/useGet";
import useRender from "./util/useRender";

type LogT = Pick<
  log,
  "uuid" | "createdAt" | "ip" | "method" | "path" | "description"
> & { username: string; account: string };

const DEFAULT_PARAMS: LogParamsT = {
  current: 1,
  pageSize: 10,
};

const useLog = () => {
  const { renderDate, renderText } = useRender();
  const [params, setParams] = useSetState<LogParamsT>(DEFAULT_PARAMS);
  const { data, isLoading } = useGet<PaginatedDataT<LogT>>({ url: "/log" });
  const tableProps: TableProps<LogT> = useMemo(
    () => ({
      rowKey: "uuid",
      columns: [
        {
          dataIndex: "createdAt",
          title: "時間",
          render: renderDate,
        },
        {
          dataIndex: "account",
          title: "帳號",
          render: renderText,
        },
        {
          dataIndex: "username",
          title: "使用者名稱",
          render: renderText,
        },
        {
          dataIndex: "ip",
          title: "IP",
          render: (_, record) => (
            <span className="font-mono">{renderText(record.ip)}</span>
          ),
        },
        {
          dataIndex: "method",
          title: "路由",
          render: (_, record) => (
            <span className="font-mono">
              <Tag>{renderText(record.method)}</Tag>
              {renderText(record.path)}
            </span>
          ),
        },
        {
          dataIndex: "description",
          title: "操作",
          render: renderText,
        },
      ],
      dataSource: data?.data?.list ?? [],
      loading: isLoading,
      pagination: {
        current: params.current,
        total: data?.data?.total ?? 0,
        onChange: (current, pageSize) => {
          setParams({ current, pageSize });
        },
      },
    }),
    [
      data?.data?.list,
      data?.data?.total,
      isLoading,
      params,
      renderDate,
      renderText,
      setParams,
    ],
  );
  return { tableProps, isLoading };
};

export default useLog;
