import { PrismaClient } from "@prisma/client";

// グローバルのPrismaインスタンスを作成（開発時のホットリロード対策）
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
