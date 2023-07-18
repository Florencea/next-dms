import { NextRequest } from "next/server";
import { toInt } from "radash";
import { ApiResponse, apiHandler } from "../../../lib/api";
import { getLogList } from "../../../lib/log";

export async function GET(req: NextRequest) {
  return await apiHandler(async () => {
    const query = req.nextUrl.searchParams;
    const current = toInt(query.get("current") ?? 1);
    const pageSize = toInt(query.get("pageSize") ?? 10);
    const ip = query.get("ip") ?? undefined;
    const method = query.get("method") ?? undefined;
    const keyword = query.get("keyword") ?? undefined;
    const account = query.get("account") ?? undefined;
    const start = query.get("start") ?? "1900-01-01";
    const end = query.get("end") ?? "2999-12-31";
    const params = {
      current,
      pageSize,
      ip,
      method,
      keyword,
      account,
      start,
      end,
    };
    const { total, data } = await getLogList(params);
    return ApiResponse.list(data, total);
  });
}
