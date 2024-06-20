/*
  Warnings:

  - You are about to drop the `_organizerActivities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_organizerEvents` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_participantsActivities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_participantsEvents` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_organizerActivities" DROP CONSTRAINT "_organizerActivities_A_fkey";

-- DropForeignKey
ALTER TABLE "_organizerActivities" DROP CONSTRAINT "_organizerActivities_B_fkey";

-- DropForeignKey
ALTER TABLE "_organizerEvents" DROP CONSTRAINT "_organizerEvents_A_fkey";

-- DropForeignKey
ALTER TABLE "_organizerEvents" DROP CONSTRAINT "_organizerEvents_B_fkey";

-- DropForeignKey
ALTER TABLE "_participantsActivities" DROP CONSTRAINT "_participantsActivities_A_fkey";

-- DropForeignKey
ALTER TABLE "_participantsActivities" DROP CONSTRAINT "_participantsActivities_B_fkey";

-- DropForeignKey
ALTER TABLE "_participantsEvents" DROP CONSTRAINT "_participantsEvents_A_fkey";

-- DropForeignKey
ALTER TABLE "_participantsEvents" DROP CONSTRAINT "_participantsEvents_B_fkey";

-- DropTable
DROP TABLE "_organizerActivities";

-- DropTable
DROP TABLE "_organizerEvents";

-- DropTable
DROP TABLE "_participantsActivities";

-- DropTable
DROP TABLE "_participantsEvents";

-- CreateTable
CREATE TABLE "UserEventRole" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "eventId" STRING NOT NULL,
    "role" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserEventRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserActivityRole" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "activityId" STRING NOT NULL,
    "role" STRING NOT NULL DEFAULT 'participant',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserActivityRole_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserEventRole_userId_eventId_key" ON "UserEventRole"("userId", "eventId");

-- CreateIndex
CREATE UNIQUE INDEX "UserActivityRole_userId_activityId_key" ON "UserActivityRole"("userId", "activityId");

-- AddForeignKey
ALTER TABLE "UserEventRole" ADD CONSTRAINT "UserEventRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserEventRole" ADD CONSTRAINT "UserEventRole_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserActivityRole" ADD CONSTRAINT "UserActivityRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserActivityRole" ADD CONSTRAINT "UserActivityRole_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
