import { ExclamationCircleOutlined } from "@ant-design/icons";
import { App } from "antd";
import { AxiosError } from "axios";
import { ErrorResponseT } from "../../lib/api";

const useMsg = () => {
  const { message } = App.useApp();
  const showError = async (err: unknown) => {
    const content =
      (err as AxiosError<ErrorResponseT>).response?.data.message ?? "發生錯誤";
    await message.open({
      content,
      type: "error",
      duration: 4,
      icon: <ExclamationCircleOutlined />,
    });
  };
  return { showError };
};

export default useMsg;
