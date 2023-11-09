import prisma from ".";

async function createDefaultUser() {
  const DEFAULT_USER = {
    account: "admin",
    password: "1qaz!QAZ",
    username: "Admin",
    isAdmin: true,
    isEditor: true,
  };
  await prisma.user.upsert({
    where: {
      account: DEFAULT_USER.account,
    },
    create: DEFAULT_USER,
    update: DEFAULT_USER,
  });
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
