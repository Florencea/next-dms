import { Layout } from "../../components/Layout";
import { AntdProvider } from "../../lib/antd";
import { NeedAdmin, NeedLogin } from "../../lib/api";
import { checkUserIsAdmin } from "../../lib/user";

export default async function Log() {
  await NeedLogin();
  await NeedAdmin();
  const isAdmin = await checkUserIsAdmin();
  return (
    <AntdProvider>
      <Layout isAdmin={isAdmin}>
        <div>
          <div>Log</div>
        </div>
      </Layout>
    </AntdProvider>
  );
}
