"use client";

import {
  FileSearchOutlined,
  HistoryOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import { usePathname, useRouter } from "next/navigation";
import useAuth from "../hooks/useAuth";

interface Props {
  children?: React.ReactNode;
  isAdmin?: boolean;
  username?: string;
}

const allMenuItems = [
  {
    key: "/record",
    label: "資料管理",
    icon: <FileSearchOutlined />,
    needAdmin: false,
  },
  {
    key: "/user",
    label: "帳號管理",
    icon: <TeamOutlined />,
    needAdmin: true,
  },
  {
    key: "/oplog",
    label: "存取紀錄管理",
    icon: <HistoryOutlined />,
    needAdmin: true,
  },
];

export const Layout = ({ children, isAdmin = false, username }: Props) => {
  const menuItems = isAdmin
    ? allMenuItems.map(({ needAdmin, ...rest }) => rest)
    : allMenuItems
        .filter((m) => !m.needAdmin)
        .map(({ needAdmin, ...rest }) => rest);
  const pathname = usePathname();
  const router = useRouter();
  const { Logout } = useAuth();
  return (
    <div className="w-full h-screen flex flex-col">
      <header className="flex justify-between items-stretch py-3 px-5">
        <h1 className="text-lg font-bold">{process.env.NEXT_PUBLIC_TITLE}</h1>
        <div className="flex justify-start items-center gap-3">
          <span className="font-bold">{username}</span>
          <Button
            type="ghost"
            onClick={() => {
              Logout.mutate({});
            }}
          >
            登出
          </Button>
        </div>
      </header>
      <div className="grow w-full flex">
        <nav className="min-w-[200px]">
          <Menu
            items={menuItems}
            defaultSelectedKeys={[pathname]}
            defaultOpenKeys={[pathname]}
            onClick={({ key }) => {
              router.push(key);
            }}
          />
        </nav>
        <main className="p-3 bg-slate-50 grow h-full">{children}</main>
      </div>
    </div>
  );
};
