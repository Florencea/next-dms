"use client";

import { Button, Card, DatePicker, Form, Input, Select, Table } from "antd";
import useLog from "../hooks/useLog";

const { RangePicker } = DatePicker;

export const LogPage = () => {
  const {
    form: { formProps, formItemProps },
    tableProps,
  } = useLog();
  return (
    <div className="flex flex-col gap-3">
      <Card className="flex flex-col gap-3">
        <Form {...formProps}>
          <Form.Item {...formItemProps.period}>
            <RangePicker allowClear={true} showTime />
          </Form.Item>
          <Form.Item {...formItemProps.keyword}>
            <Input allowClear />
          </Form.Item>
          <Form.Item {...formItemProps.ip}>
            <Input allowClear />
          </Form.Item>
          <Form.Item {...formItemProps.method}>
            <Select
              style={{ width: 300 }}
              options={[
                { label: "全部", value: "" },
                { label: "GET", value: "GET" },
                { label: "POST", value: "POST" },
                { label: "PATCH", value: "PATCH" },
                { label: "DELETE", value: "DELETE" },
              ]}
              allowClear
            />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            搜尋
          </Button>
        </Form>
      </Card>
      <Card className="flex flex-col gap-3">
        <Table {...tableProps} />
      </Card>
    </div>
  );
};
