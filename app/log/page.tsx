import { Layout } from "../../components/Layout";
import { LogTable } from "../../components/LogTable";
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
        <LogTable />
      </Layout>
    </AntdProvider>
  );
}
