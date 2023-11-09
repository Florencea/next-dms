import { ApiResponse, apiHandler } from "../../../../lib/api";
import { getUserOptions } from "../../../../lib/user";

export async function GET() {
  return await apiHandler(
    async () => {
      const { total, data } = await getUserOptions();
      return ApiResponse.list(data, total);
    },
    { needAdmin: true, needLogin: true },
  );
}
