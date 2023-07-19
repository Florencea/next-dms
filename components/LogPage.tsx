"use client";

import { SearchOutlined } from "@ant-design/icons";
import { Button, Card, DatePicker, Form, Input, Select, Table } from "antd";
import useLog from "../hooks/useLog";

const { RangePicker } = DatePicker;

export const LogPage = () => {
  const {
    form: { formProps, formItemProps },
    tableProps,
    userOptions,
    ipOptions,
  } = useLog();
  return (
    <div className="flex flex-col gap-3">
      <Card className="flex flex-col gap-3">
        <Form {...formProps} className="gap-y-3">
          <Form.Item {...formItemProps.period}>
            <RangePicker
              allowClear={true}
              showTime
              placeholder={["開始", "結束"]}
            />
          </Form.Item>
          <Form.Item {...formItemProps.account}>
            <Select
              style={{ width: 150 }}
              options={userOptions}
              allowClear
              showSearch
              optionFilterProp="label"
              placeholder="全部"
            />
          </Form.Item>
          <Form.Item {...formItemProps.ip}>
            <Select
              style={{ width: 150 }}
              options={ipOptions}
              allowClear
              showSearch
              optionFilterProp="label"
              placeholder="全部"
            />
          </Form.Item>
          <Form.Item {...formItemProps.method}>
            <Select
              style={{ width: 100 }}
              options={[
                { label: "GET", value: "GET" },
                { label: "POST", value: "POST" },
                { label: "PATCH", value: "PATCH" },
                { label: "DELETE", value: "DELETE" },
              ]}
              allowClear
              showSearch
              optionFilterProp="label"
              placeholder="全部"
            />
          </Form.Item>
          <Form.Item {...formItemProps.keyword}>
            <Input style={{ width: 150 }} allowClear placeholder="路由/操作" />
          </Form.Item>
          <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
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
