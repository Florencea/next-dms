import { PrismaClient } from "@prisma/client";
import { userCreateExtesion } from "./extensions";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma.$extends(userCreateExtesion());
