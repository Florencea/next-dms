import { NeedAdmin, NeedLogin } from "../../lib/api";

export default async function User() {
  await NeedLogin();
  await NeedAdmin();
  return (
    <div>
      <div>User</div>
    </div>
  );
}
