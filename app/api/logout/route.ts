import { ApiResponse, apiHandler } from "../../../lib/api";

export async function POST() {
  return await apiHandler(async () => {
    return ApiResponse.redirect(
      "/login",
      "token=deleted; HttpOnly; Path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT",
    );
  });
}
