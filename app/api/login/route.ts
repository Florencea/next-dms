import type { NextRequest } from "next/server";
import { ApiResponse, apiHandler, operationLogger } from "../../../lib/api";
import { getJwt } from "../../../lib/user";

interface LoginT {
  account?: string;
  password?: string;
}

export async function POST(req: NextRequest) {
  return await apiHandler(
    async () => {
      const { account = null, password = null } = (await req.json()) as LoginT;
      if (account === null || password === null) {
        return ApiResponse.error(400, new Error("請輸入帳號密碼"));
      } else {
        const authData = await getJwt(`${account}`, `${password}`);
        if (authData === null) {
          return ApiResponse.error(401, new Error("不正確的帳號密碼"));
        } else {
          await operationLogger(req, "使用者登入", authData.userUuid);
          return ApiResponse.setCookie(
            `token=${authData.token}; HttpOnly; Path=/`,
          );
        }
      }
    },
    { needAdmin: false, needLogin: false },
  );
}
