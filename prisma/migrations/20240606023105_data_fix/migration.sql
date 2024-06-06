/*
  Warnings:

  - You are about to drop the column `ownersIds` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `participantsIds` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `activitiesIds` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `ownersIds` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `participantsIds` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "ownersIds";
ALTER TABLE "Activity" DROP COLUMN "participantsIds";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "activitiesIds";
ALTER TABLE "Event" DROP COLUMN "ownersIds";
ALTER TABLE "Event" DROP COLUMN "participantsIds";
