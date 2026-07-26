-- DropIndex
DROP INDEX IF EXISTS "habit_title_key";

-- CreateIndex
CREATE UNIQUE INDEX "habit_userId_title_key" ON "habit"("userId", "title");
