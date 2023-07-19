import { NextRequest } from "next/server";
import { ApiResponse, apiHandler } from "../../../../lib/api";
import { getIpOptions } from "../../../../lib/log";

export async function GET(req: NextRequest) {
  return await apiHandler(
    async () => {
      const { total, data } = await getIpOptions();
      return ApiResponse.list(data, total);
    },
    { needAdmin: true, needLogin: true },
  );
}
