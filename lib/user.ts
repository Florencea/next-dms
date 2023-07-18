import argon2 from "argon2";
import * as jose from "jose";
import { cookies } from "next/headers";
import prisma from "./prisma";

const secret = new TextEncoder().encode(
  "cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2",
);

export const getUserUuid = async () => {
  try {
    const cookieStore = cookies();
    const jwt = cookieStore.get("token");
    if (!jwt) {
      return null;
    } else {
      const token = jwt.value;
      const { payload } = await jose.jwtVerify(token, secret);
      return `${payload.sub}`;
    }
  } catch (e) {
    return null;
  }
};

export const getUserUsername = async () => {
  try {
    const cookieStore = cookies();
    const jwt = cookieStore.get("token");
    if (!jwt) {
      return "";
    } else {
      const token = jwt.value;
      const { payload } = await jose.jwtVerify(token, secret);
      const userUuid = `${payload.sub}`;
      const user = await prisma.user.findUnique({
        where: { uuid: userUuid },
        select: { username: true },
      });
      const username = user?.username ?? "";
      return username;
    }
  } catch (e) {
    return "";
  }
};

export const getJwt = async (account: string, password: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { account } });
    if (!user) {
      return null;
    } else {
      const isPasswordMatch = await argon2.verify(user.password, password);
      if (!isPasswordMatch) {
        return null;
      } else {
        const token = await new jose.SignJWT({ sub: user.uuid })
          .setProtectedHeader({ alg: "HS256" })
          .setIssuedAt()
          .setExpirationTime("1d")
          .sign(secret);
        return { token, userUuid: user.uuid };
      }
    }
  } catch (e) {
    return null;
  }
};

export const checkUserIsAdmin = async () => {
  try {
    const uuid = await getUserUuid();
    if (uuid === null) {
      return false;
    } else {
      const dbUser = await prisma.user.findUnique({
        where: {
          uuid,
        },
      });
      if (dbUser === null) {
        return false;
      } else {
        return dbUser.isAdmin;
      }
    }
  } catch (e) {
    return false;
  }
};

export const checkUserIsEditor = async () => {
  try {
    const uuid = await getUserUuid();
    if (uuid === null) {
      return false;
    } else {
      const dbUser = await prisma.user.findUnique({
        where: {
          uuid,
        },
      });
      if (dbUser === null) {
        return false;
      } else {
        return dbUser.isEditor;
      }
    }
  } catch (e) {
    return false;
  }
};
