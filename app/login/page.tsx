import { LoginForm } from "../../components/LoginForm";
import { AntdProvider } from "../../lib/antd";
import { AutoLogin } from "../../lib/api";

export default async function Login() {
  await AutoLogin();
  return (
    <main className="w-full h-screen flex justify-center items-center bg-primary">
      <AntdProvider>
        <LoginForm />
      </AntdProvider>
    </main>
  );
}
