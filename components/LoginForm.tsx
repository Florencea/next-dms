"use client";

import { Button, Card, Form, Input } from "antd";
import useAuth from "../hooks/useAuth";

export const LoginForm = () => {
  const {
    form: { formProps, formItemProps },
  } = useAuth();
  return (
    <Card className="animate-fade-in-up">
      <Form {...formProps}>
        <Form.Item {...formItemProps.account}>
          <Input />
        </Form.Item>
        <Form.Item {...formItemProps.password}>
          <Input.Password />
        </Form.Item>
        <Form.Item className="text-center">
          <Button type="primary" htmlType="submit" block>
            登入
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
