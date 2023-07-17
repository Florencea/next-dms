import dayjs from "dayjs";
import { NextResponse } from "next/server";

interface ErrorResponseT {
  name: string;
  message: string;
  cause: string;
  stack: string;
}

interface PaginatedDataT<DataT> {
  list: DataT[];
  total: number;
}

interface ApiResponseT<DataT> {
  code: string;
  timestamp: string;
  msg: string;
  success: boolean;
  data: DataT;
}

const now = () => dayjs().toISOString();

const list = <DataT>(
  data: DataT[],
  total: number,
): NextResponse<ApiResponseT<PaginatedDataT<DataT>>> => {
  return NextResponse.json(
    {
      code: "200",
      timestamp: now(),
      msg: "success",
      success: true,
      data: {
        list: data,
        total,
      },
    },
    { status: 200, statusText: "ok" },
  );
};

const item = <DataT>(data: DataT): NextResponse<ApiResponseT<DataT>> => {
  return NextResponse.json(
    {
      code: "200",
      timestamp: now(),
      msg: "success",
      success: true,
      data,
    },
    { status: 200, statusText: "ok" },
  );
};

const error = (
  code: number,
  err: Error,
): NextResponse<ApiResponseT<ErrorResponseT | null>> => {
  return NextResponse.json(
    {
      code: `${code}`,
      timestamp: now(),
      msg: err.message,
      success: false,
      data:
        process.env.NODE_ENV === "development"
          ? {
              name: err.name,
              message: err.message,
              cause: `${err.cause}`,
              stack: `${err.stack}`,
            }
          : null,
    },
    { status: code, statusText: "error" },
  );
};

const redirect = (Location: string, cookieStr?: string) => {
  return new Response(null, {
    status: 302,
    headers: cookieStr
      ? {
          Location,
          "Set-Cookie": cookieStr,
        }
      : { Location },
  });
};

export const ApiResponse = {
  list,
  item,
  redirect,
  error,
};

export const apiHandler = async (handler: () => Promise<Response>) => {
  try {
    return await handler();
  } catch (err) {
    const msg = (err as Error)?.message ?? "伺服器發生錯誤";
    return ApiResponse.error(500, new Error(msg));
  }
};
