import { NextRequest } from "next/server";
import { ApiResponse, apiHandler } from "../../../lib/api";
import { getJwt } from "../../../lib/user";

export async function POST(req: NextRequest) {
  return await apiHandler(async () => {
    const { account = null, password = null } = await req.json();
    if (account === null || password === null) {
      return ApiResponse.error(400, new Error("請輸入帳號密碼"));
    } else {
      const token = await getJwt(`${account}`, `${password}`);
      if (token === null) {
        return ApiResponse.error(401, new Error("不正確的帳號密碼"));
      } else {
        return ApiResponse.redirect(
          "/record",
          `token=${token}; HttpOnly; Path=/`,
        );
      }
    }
  });
}
