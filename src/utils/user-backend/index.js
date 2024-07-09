import { PrismaClient } from "@prisma/client";
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient().$extends(withAccelerate())

export async function updateUser(id, name, description) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: {
        name: name,
        description: description,
      },
    });
    console.log("User updated:", updatedUser);
    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

export async function getUserInfo(userId) {
  try {
    const userInfo = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        description: true,
        image: true,
      },
      cacheStrategy: {
        swr: 60,
      },
    });
    console.log("User info:", userInfo);
    return userInfo;
  } catch (error) {
    console.error("Error retrieving user info:", error);
    throw error;
  }
}
