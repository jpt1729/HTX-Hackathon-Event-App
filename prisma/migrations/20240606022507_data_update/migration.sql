-- CreateTable
CREATE TABLE "Event" (
    "id" STRING NOT NULL,
    "slug" STRING NOT NULL,
    "published" BOOL DEFAULT true,
    "title" STRING NOT NULL,
    "description" STRING,
    "ownersIds" STRING[],
    "participantsIds" STRING[],
    "activitiesIds" STRING[],
    "location" JSONB NOT NULL,
    "playlist" STRING,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" STRING NOT NULL,
    "eventId" STRING NOT NULL,
    "slug" STRING NOT NULL,
    "published" BOOL DEFAULT true,
    "title" STRING NOT NULL,
    "description" STRING,
    "ownersIds" STRING[],
    "participantsIds" STRING[],
    "content" JSONB,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_organizerEvents" (
    "A" STRING NOT NULL,
    "B" STRING NOT NULL
);

-- CreateTable
CREATE TABLE "_participantsEvents" (
    "A" STRING NOT NULL,
    "B" STRING NOT NULL
);

-- CreateTable
CREATE TABLE "_organizerActivities" (
    "A" STRING NOT NULL,
    "B" STRING NOT NULL
);

-- CreateTable
CREATE TABLE "_participantsActivities" (
    "A" STRING NOT NULL,
    "B" STRING NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_slug_key" ON "Event"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "_organizerEvents_AB_unique" ON "_organizerEvents"("A", "B");

-- CreateIndex
CREATE INDEX "_organizerEvents_B_index" ON "_organizerEvents"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_participantsEvents_AB_unique" ON "_participantsEvents"("A", "B");

-- CreateIndex
CREATE INDEX "_participantsEvents_B_index" ON "_participantsEvents"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_organizerActivities_AB_unique" ON "_organizerActivities"("A", "B");

-- CreateIndex
CREATE INDEX "_organizerActivities_B_index" ON "_organizerActivities"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_participantsActivities_AB_unique" ON "_participantsActivities"("A", "B");

-- CreateIndex
CREATE INDEX "_participantsActivities_B_index" ON "_participantsActivities"("B");

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_organizerEvents" ADD CONSTRAINT "_organizerEvents_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_organizerEvents" ADD CONSTRAINT "_organizerEvents_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_participantsEvents" ADD CONSTRAINT "_participantsEvents_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_participantsEvents" ADD CONSTRAINT "_participantsEvents_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_organizerActivities" ADD CONSTRAINT "_organizerActivities_A_fkey" FOREIGN KEY ("A") REFERENCES "Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_organizerActivities" ADD CONSTRAINT "_organizerActivities_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_participantsActivities" ADD CONSTRAINT "_participantsActivities_A_fkey" FOREIGN KEY ("A") REFERENCES "Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_participantsActivities" ADD CONSTRAINT "_participantsActivities_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
