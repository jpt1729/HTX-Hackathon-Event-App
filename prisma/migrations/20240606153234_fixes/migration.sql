-- DropIndex
DROP INDEX "Activity_eventId_key";

-- AlterTable
ALTER TABLE "Activity" ALTER COLUMN "published" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "published" SET DEFAULT false;
