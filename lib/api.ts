import dayjs from "dayjs";
import { redirect as nextRedirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import prisma from "./prisma";
import { checkUserIsAdmin, getUserUuid } from "./user";

export interface ErrorResponseT {
  name: string;
  message: string;
  cause: string;
  stack: string;
}

export interface PaginatedDataT<DataT> {
  list: DataT[];
  total: number;
}

export interface ApiResponseT<DataT> {
  code: string;
  timestamp: string;
  message: string;
  success: boolean;
  data: DataT;
}

export const DEAFULT_PUBLIC_ROUTE = "/login";

export const DEFAULT_PRIVATE_ROUTE = "/record";

const now = () => dayjs().toISOString();

const list = <DataT>(
  data: DataT[],
  total: number,
): NextResponse<ApiResponseT<PaginatedDataT<DataT>>> => {
  return NextResponse.json(
    {
      code: "200",
      timestamp: now(),
      message: "success",
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
      message: "success",
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
      message: err.message,
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

const redirect = (Location: string) => {
  return new Response(null, {
    status: 302,
    headers: { Location },
  });
};

const setCookie = (cookieStr: string): NextResponse<ApiResponseT<null>> => {
  return NextResponse.json(
    {
      code: "200",
      timestamp: now(),
      message: "success",
      success: true,
      data: null,
    },
    {
      status: 200,
      statusText: "ok",
      headers: {
        "Set-Cookie": cookieStr,
      },
    },
  );
};

const removeCookie = (cookieKey: string): NextResponse<ApiResponseT<null>> => {
  return NextResponse.json(
    {
      code: "200",
      timestamp: now(),
      message: "success",
      success: true,
      data: null,
    },
    {
      status: 200,
      statusText: "ok",
      headers: {
        "Set-Cookie": `${cookieKey}=deleted; HttpOnly; Path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
      },
    },
  );
};

export const operationLogger = async (
  req: NextRequest,
  description: string,
  userUuid?: string,
) => {
  const ip = `${req.headers.get("x-forwarded-for")}`;
  const method = req.method;
  const path = req.nextUrl.pathname;
  if (userUuid) {
    await prisma.log.create({
      data: {
        ip,
        method,
        path,
        description,
        userUuid,
      },
    });
  } else {
    const userUuidFromDb = await getUserUuid();
    if (userUuidFromDb) {
      await prisma.log.create({
        data: {
          ip,
          method,
          path,
          description,
          userUuid: userUuidFromDb,
        },
      });
    }
  }
};

export const ApiResponse = {
  list,
  item,
  redirect,
  setCookie,
  removeCookie,
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

export const AutoLogin = async () => {
  const user = await getUserUuid();
  if (user) {
    nextRedirect(DEFAULT_PRIVATE_ROUTE);
  }
};

export const NeedLogin = async () => {
  const user = await getUserUuid();
  if (!user) {
    nextRedirect(DEAFULT_PUBLIC_ROUTE);
  }
};

export const NeedAdmin = async () => {
  const isAdmin = await checkUserIsAdmin();
  if (!isAdmin) {
    redirect(DEFAULT_PRIVATE_ROUTE);
  }
};
