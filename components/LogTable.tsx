"use client";

import { Card, Table } from "antd";
import useLog from "../hooks/useLog";

export const LogTable = () => {
  const { tableProps } = useLog();
  return (
    <Card className="flex flex-col gap-3">
      <Table {...tableProps} />
    </Card>
  );
};
