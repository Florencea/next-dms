"use client";

import { Button, Card, Form, Input } from "antd";
import useAuth from "../hooks/useAuth";
import useAutofocus from "../hooks/util/useAutofocus";

export const LoginForm = () => {
  const autoFocusRef = useAutofocus();
  const {
    Login: { isLoading },
    form: { formProps, formItemProps },
  } = useAuth();
  return (
    <Card className="animate-fade-in-up">
      <Form {...formProps}>
        <Form.Item {...formItemProps.account}>
          <Input ref={autoFocusRef} />
        </Form.Item>
        <Form.Item {...formItemProps.password}>
          <Input.Password />
        </Form.Item>
        <Button type="primary" htmlType="submit" block disabled={isLoading}>
          登入
        </Button>
      </Form>
    </Card>
  );
};
