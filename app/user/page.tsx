import { Layout } from "../../components/Layout";
import { AntdProvider } from "../../lib/antd";
import { NeedAdmin, NeedLogin } from "../../lib/api";
import { checkUserIsAdmin } from "../../lib/user";

export default async function User() {
  await NeedLogin();
  await NeedAdmin();
  const isAdmin = await checkUserIsAdmin();
  return (
    <AntdProvider>
      <Layout isAdmin={isAdmin}>
        <div>
          <div>User</div>
        </div>
      </Layout>
    </AntdProvider>
  );
}
