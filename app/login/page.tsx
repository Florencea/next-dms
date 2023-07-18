import { LoginForm } from "../../components/LoginForm";
import { AntdProvider } from "../../lib/antd";

export default function Login() {
  return (
    <main className="w-full h-screen flex justify-center items-center bg-primary">
      <AntdProvider>
        <LoginForm />
      </AntdProvider>
    </main>
  );
}
