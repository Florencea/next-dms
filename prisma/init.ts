import argon2 from "argon2";
import prisma from "../lib/prisma";

async function createDefaultUser() {
  const hashedPassword = await argon2.hash("1qaz!QAZ");
  const DEFAULT_USER = {
    account: "admin",
    password: hashedPassword,
    username: "Admin",
    isAdmin: true,
    isEditor: true,
  };
  await prisma.user.upsert({
    create: DEFAULT_USER,
    update: DEFAULT_USER,
    where: {
      account: DEFAULT_USER.account,
    },
  });
  const allUsers = await prisma.user.findMany();
  console.table(allUsers);
}

async function main() {
  await createDefaultUser();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
