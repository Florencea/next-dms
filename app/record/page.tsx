import { NeedLogin } from "../../lib/api";

export default async function Record() {
  await NeedLogin();
  return (
    <div>
      <div>Record</div>
    </div>
  );
}
