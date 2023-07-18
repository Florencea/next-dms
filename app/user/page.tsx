import { Layout } from "../../components/Layout";
import { AntdProvider } from "../../lib/antd";
import { NeedAdmin, NeedLogin } from "../../lib/api";
import { checkUserIsAdmin, getUserUsername } from "../../lib/user";

export default async function User() {
  await NeedLogin();
  await NeedAdmin();
  const isAdmin = await checkUserIsAdmin();
  const username = await getUserUsername();
  return (
    <AntdProvider>
      <Layout isAdmin={isAdmin} username={username}>
        <div>
          <div>User</div>
        </div>
      </Layout>
    </AntdProvider>
  );
}
