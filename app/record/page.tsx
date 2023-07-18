import { Layout } from "../../components/Layout";
import { AntdProvider } from "../../lib/antd";
import { NeedLogin } from "../../lib/api";
import { checkUserIsAdmin } from "../../lib/user";

export default async function Record() {
  await NeedLogin();
  const isAdmin = await checkUserIsAdmin();
  return (
    <AntdProvider>
      <Layout isAdmin={isAdmin}>
        <div>
          <div>Record</div>
        </div>
      </Layout>
    </AntdProvider>
  );
}
