import { PrismaClient } from '@prisma/client';

export type { Address, InvoiceItem, Prisma } from '@prisma/client';

export const prisma = new PrismaClient();
