import { Layout } from "../../components/Layout";
import { AntdProvider } from "../../lib/antd";
import { NeedLogin } from "../../lib/api";
import { checkUserIsAdmin, getUserUsername } from "../../lib/user";

export default async function Record() {
  await NeedLogin();
  const isAdmin = await checkUserIsAdmin();
  const username = await getUserUsername();
  return (
    <AntdProvider>
      <Layout isAdmin={isAdmin} username={username}>
        <div>
          <div>Record</div>
        </div>
      </Layout>
    </AntdProvider>
  );
}
