/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `habit` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "habit_title_key" ON "habit"("title");
