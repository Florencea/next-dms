import { NeedLogin } from "../../lib/api";

export default async function User() {
  await NeedLogin();
  return (
    <div>
      <div>User</div>
    </div>
  );
}
