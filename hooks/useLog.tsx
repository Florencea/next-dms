"use client";

import { log } from "@prisma/client";
import { useSetState } from "ahooks";
import { PaginationProps, TableProps, Tag } from "antd";
import { Dayjs } from "dayjs";
import { useMemo } from "react";
import { OptionT, PaginatedDataT } from "../lib/api";
import { LogParamsT } from "../lib/log";
import useGet from "./query/useGet";
import useForm from "./util/useForm";
import useRender from "./util/useRender";

type LogT = Pick<
  log,
  "uuid" | "createdAt" | "ip" | "method" | "path" | "description"
> & { username: string; account: string };

const DEFAULT_PAGINATION_PROPS: PaginationProps = {
  showSizeChanger: true,
  showTotal: (total, [start, end]) =>
    `目前是 ${total} 筆中的 第 ${start} 筆到第 ${end} 筆`,
  locale: {
    items_per_page: "筆/頁",
  },
};

const DEFAULT_PARAMS: LogParamsT = {
  current: 1,
  pageSize: 10,
};

const useLog = () => {
  const { renderDate, renderText } = useRender();
  const [params, setParams] = useSetState<LogParamsT>(DEFAULT_PARAMS);
  const { data: userOptionData } = useGet<PaginatedDataT<OptionT>>({
    url: "/options/user",
  });
  const { data: ipOptionData } = useGet<PaginatedDataT<OptionT>>({
    url: "/options/ip",
  });
  const { data, isLoading } = useGet<PaginatedDataT<LogT>>({
    url: "/oplog",
    params,
  });
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
        ...DEFAULT_PAGINATION_PROPS,
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
  const form = useForm<
    Omit<LogParamsT, "current" | "pageSize"> & {
      period?: [Dayjs | null, Dayjs | null];
    }
  >(
    {
      layout: "inline",
      onFinish: (values) => {
        const [startDate, endDate] = values?.period ?? [null, null];
        const start = startDate?.toISOString();
        const end = endDate?.toISOString();
        const { ip, method, keyword, account } = values;
        setParams({
          ...DEFAULT_PARAMS,
          ip: ip === "" ? undefined : ip,
          method: method === "" ? undefined : method,
          keyword: keyword === "" ? undefined : keyword,
          account: account === "" ? undefined : account,
          start,
          end,
        });
      },
    },
    {
      ip: {
        name: "ip",
        label: "IP",
        rules: [{ required: false }],
      },
      method: {
        name: "method",
        label: "路由請求方法",
        rules: [{ required: false }],
      },
      account: {
        name: "account",
        label: "使用者名稱",
        rules: [{ required: false }],
      },
      keyword: {
        name: "keyword",
        label: "關鍵字",
        rules: [{ required: false }],
      },
      period: {
        name: "period",
        label: "期間",
        rules: [{ required: false }],
      },
    },
  );
  return {
    tableProps,
    isLoading,
    form,
    userOptions: userOptionData?.data?.list ?? [],
    ipOptions: ipOptionData?.data?.list ?? [],
  };
};

export default useLog;
