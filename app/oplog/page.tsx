import { Layout } from "../../components/Layout";
import { LogPage } from "../../components/LogPage";
import { AntdProvider } from "../../lib/antd";
import { NeedAdmin, NeedLogin } from "../../lib/api";
import { checkUserIsAdmin, getUserUsername } from "../../lib/user";

export default async function Log() {
  await NeedLogin();
  await NeedAdmin();
  const isAdmin = await checkUserIsAdmin();
  const username = await getUserUsername();
  return (
    <AntdProvider>
      <Layout isAdmin={isAdmin} username={username}>
        <div className="flex flex-col gap-3">
          <LogPage />
        </div>
      </Layout>
    </AntdProvider>
  );
}
