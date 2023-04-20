// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// declare global {
//     namespace NodeJS{
//         interface Global {}
//     }
// }

// interface CustomeNodeJsGlobal extends NodeJS.Global {
//     prisma: PrismaClient
// }

// declare const global: CustomeNodeJsGlobal

// const prisma = global.prisma || new PrismaClient()
// if(process.env.NODE_ENV === 'development') global.prisma = prisma

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;