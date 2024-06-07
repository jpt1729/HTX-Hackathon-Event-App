import { cookies } from 'next/headers'
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
 
export async function getSession() {
  const sessionId = cookies().get('sessionId')?.value
  return sessionId ? await db.findSession(sessionId) : null
}