-- CreateTable
CREATE TABLE "check_in" (
    "id" TEXT NOT NULL,
    "habitId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "check_in_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "habit" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "habit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "check_in_habitId_idx" ON "check_in"("habitId");

-- CreateIndex
CREATE UNIQUE INDEX "check_in_habitId_date_key" ON "check_in"("habitId", "date");

-- CreateIndex
CREATE INDEX "habit_userId_idx" ON "habit"("userId");

-- CreateIndex
CREATE INDEX "habit_archived_idx" ON "habit"("archived");

-- CreateIndex
CREATE INDEX "habit_userId_archived_idx" ON "habit"("userId", "archived");

-- AddForeignKey
ALTER TABLE "check_in" ADD CONSTRAINT "check_in_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "habit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "habit" ADD CONSTRAINT "habit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
