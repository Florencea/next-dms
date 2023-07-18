import prisma from "./prisma";

export interface LogParamsT {
  current: number;
  pageSize: number;
  ip?: string;
  method?: string;
  keyword?: string;
  account?: string;
  start?: string;
  end?: string;
}

export const getLogList = async (params: LogParamsT) => {
  const query = {
    OR: [
      {
        ip: {
          contains: params.ip,
        },
      },
      {
        method: {
          contains: params.method,
        },
      },
      {
        path: {
          contains: params.keyword,
        },
      },
      {
        description: {
          contains: params.keyword,
        },
      },
      {
        user: {
          OR: [
            {
              account: {
                contains: params.account,
              },
            },
            {
              account: {
                contains: params.keyword,
              },
            },
            {
              username: {
                contains: params.keyword,
              },
            },
          ],
        },
      },
      {
        createdAt: {
          gte: new Date(params.start ?? "1900-01-01"),
          lte: new Date(params.end ?? "2999-12-31"),
        },
      },
    ],
  };
  const total = await prisma.log.count({
    where: query,
  });
  const dataOriginal = await prisma.log.findMany({
    where: query,
    select: {
      uuid: true,
      createdAt: true,
      ip: true,
      method: true,
      path: true,
      description: true,
      user: {
        select: {
          username: true,
          account: true,
        },
      },
    },
    take: params.pageSize,
    skip: params.pageSize * (params.current - 1),
    orderBy: {
      createdAt: "desc",
    },
  });
  const data = dataOriginal.map(({ user: { username, account }, ...rest }) => ({
    ...rest,
    username,
    account,
  }));
  return { total, data };
};
