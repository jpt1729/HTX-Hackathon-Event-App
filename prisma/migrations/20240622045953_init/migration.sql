/*
  Warnings:

  - You are about to drop the column `content` on the `Activity` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Authenticator" DROP CONSTRAINT "Authenticator_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserActivityRole" DROP CONSTRAINT "UserActivityRole_activityId_fkey";

-- DropForeignKey
ALTER TABLE "UserActivityRole" DROP CONSTRAINT "UserActivityRole_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserEventRole" DROP CONSTRAINT "UserEventRole_eventId_fkey";

-- DropForeignKey
ALTER TABLE "UserEventRole" DROP CONSTRAINT "UserEventRole_userId_fkey";

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "content";

-- CreateTable
CREATE TABLE "ActivityContent" (
    "id" STRING NOT NULL,
    "title" STRING,
    "type" STRING NOT NULL,
    "activityId" STRING NOT NULL,
    "content" JSONB NOT NULL,

    CONSTRAINT "ActivityContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityContentResponses" (
    "id" STRING NOT NULL,
    "activitycontentId" STRING,
    "userId" STRING NOT NULL,
    "response" STRING NOT NULL,

    CONSTRAINT "ActivityContentResponses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ActivityContent_activityId_key" ON "ActivityContent"("activityId");

-- CreateIndex
CREATE UNIQUE INDEX "ActivityContentResponses_userId_key" ON "ActivityContentResponses"("userId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Authenticator" ADD CONSTRAINT "Authenticator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserEventRole" ADD CONSTRAINT "UserEventRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserEventRole" ADD CONSTRAINT "UserEventRole_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserActivityRole" ADD CONSTRAINT "UserActivityRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserActivityRole" ADD CONSTRAINT "UserActivityRole_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityContent" ADD CONSTRAINT "ActivityContent_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityContentResponses" ADD CONSTRAINT "ActivityContentResponses_activitycontentId_fkey" FOREIGN KEY ("activitycontentId") REFERENCES "ActivityContent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityContentResponses" ADD CONSTRAINT "ActivityContentResponses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
