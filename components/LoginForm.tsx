"use client";

import { Button, Card, Form, Input } from "antd";
import useAuth from "../hooks/useAuth";
import useAutofocus from "../hooks/util/useAutofocus";

export const LoginForm = () => {
  const autoFocusRef = useAutofocus();
  const {
    Login: { isPending },
    form: { formProps, formItemProps },
  } = useAuth();
  return (
    <Card className="animate-fade-in-up">
      <h1 className="text-lg font-bold w-full text-center mb-5">
        {process.env.NEXT_PUBLIC_TITLE}
      </h1>
      <Form {...formProps}>
        <Form.Item {...formItemProps.account}>
          <Input ref={autoFocusRef} />
        </Form.Item>
        <Form.Item {...formItemProps.password}>
          <Input.Password />
        </Form.Item>
        <Button type="primary" htmlType="submit" block disabled={isPending}>
          登入
        </Button>
      </Form>
    </Card>
  );
};
