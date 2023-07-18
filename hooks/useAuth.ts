import { user } from "@prisma/client";
import { useRouter } from "next/navigation";
import usePost from "./query/usePost";
import useForm from "./util/useForm";
import useMsg from "./util/useMsg";

type LoginT = Pick<user, "account" | "password">;

const useAuth = () => {
  const router = useRouter();
  const { showError } = useMsg();
  const Login = usePost<undefined, LoginT>(
    { url: "/login" },
    {
      onSuccess: () => {
        router.replace("/record");
      },
      onError: showError,
    },
  );
  const Logout = usePost(
    { url: "/logout" },
    {
      onSuccess: () => {
        router.replace("/login");
      },
    },
  );
  const form = useForm<LoginT>(
    {
      onFinish: (values) => {
        Login.mutate(values);
      },
    },
    {
      account: { label: "帳號", name: "account", rules: [{ required: true }] },
      password: {
        label: "密碼",
        name: "password",
        rules: [{ required: true }],
      },
    },
  );
  return { form, Logout, Login };
};

export default useAuth;
