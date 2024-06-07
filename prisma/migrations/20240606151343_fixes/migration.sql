/*
  Warnings:

  - A unique constraint covering the columns `[eventId]` on the table `Activity` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Activity` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "content" STRING;

-- CreateIndex
CREATE UNIQUE INDEX "Activity_eventId_key" ON "Activity"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "Activity_slug_key" ON "Activity"("slug");
