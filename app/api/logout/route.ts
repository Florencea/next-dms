import { NextRequest } from "next/server";
import { ApiResponse, apiHandler, operationLogger } from "../../../lib/api";

export async function POST(req: NextRequest) {
  return await apiHandler(async () => {
    await operationLogger(req, "使用者登出");
    return ApiResponse.removeCookie("token");
  });
}
