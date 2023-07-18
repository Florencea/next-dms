"use client";

import { App, ConfigProvider } from "antd";
import zhTW from "antd/es/locale/zh_TW";
import "dayjs/locale/zh-tw";
import dynamic from "next/dynamic";
import tailwindConfig from "../tailwind.config";
import { QueryProvider } from "./query";

const StyleProvider = dynamic(
  () => import("@ant-design/cssinjs").then((mod) => mod.StyleProvider),
  { ssr: false },
);

const PRIMARY_COLOR = tailwindConfig.theme.extend.colors.primary;

export const AntdProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyleProvider hashPriority="high">
      <ConfigProvider
        locale={zhTW}
        theme={{
          token: {
            colorPrimary: PRIMARY_COLOR,
            colorInfo: PRIMARY_COLOR,
            colorLink: PRIMARY_COLOR,
            colorLinkHover: PRIMARY_COLOR,
            colorLinkActive: PRIMARY_COLOR,
          },
        }}
      >
        <QueryProvider>
          <App>{children}</App>
        </QueryProvider>
      </ConfigProvider>
    </StyleProvider>
  );
};
