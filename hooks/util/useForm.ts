import { Form, FormInstance, FormItemProps, FormProps } from "antd";
import { nanoid } from "nanoid";

type FormItemPropsT<T> = {
  [K in keyof T]: FormItemProps<T> & {
    label: string;
    name: K;
    rules: [{ required: boolean }];
  };
};

const useForm = <T>(
  formProps: FormProps<T>,
  formItemProps: FormItemPropsT<T>,
): {
  formInstance: FormInstance<T>;
  formProps: FormProps<T>;
  formItemProps: FormItemPropsT<T>;
} => {
  const [formInstance] = Form.useForm<T>();
  return {
    formInstance,
    formProps: {
      form: formInstance,
      name: nanoid(),
      preserve: false,
      ...formProps,
    },
    formItemProps,
  };
};

export default useForm;
