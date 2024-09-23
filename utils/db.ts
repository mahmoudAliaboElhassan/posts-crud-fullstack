import { PrismaClient } from "@prisma/client";
// in development
const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

// prevent creating many instances of PrismaClient

// in production
// const prisma = new PrismaClient();
// export default prisma;
