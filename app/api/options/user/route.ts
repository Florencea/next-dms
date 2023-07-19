import { NextRequest } from "next/server";
import { ApiResponse, apiHandler } from "../../../../lib/api";
import { getUserOptions } from "../../../../lib/user";

export async function GET(req: NextRequest) {
  return await apiHandler(
    async () => {
      const { total, data } = await getUserOptions();
      return ApiResponse.list(data, total);
    },
    { needAdmin: true, needLogin: true },
  );
}
