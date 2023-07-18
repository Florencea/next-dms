import { NeedAdmin, NeedLogin } from "../../lib/api";

export default async function Log() {
  await NeedLogin();
  await NeedAdmin();
  return (
    <div>
      <div>Log</div>
    </div>
  );
}
